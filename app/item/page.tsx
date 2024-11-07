"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Calendar, User, Phone, Mail, AlertTriangle, X } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Item } from '@/interfaces/itemInterface'

export default function ItemDetailPage() {
    const searchParams = useSearchParams()
    const queries = Object.fromEntries(searchParams.entries())
    const { id } = queries
    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [showContact, setShowContact] = useState(false)
    const [claimSubmitted, setClaimSubmitted] = useState(false)
    const [showFullImage, setShowFullImage] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await fetch(`http://localhost:8080/singleLostItem/${encodeURIComponent(id)}`, {
                    method: "GET",
                })
                const data = await response.json()
                setItem(data.document)
            } catch (error) {
                console.error("Error fetching items:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchItems()
    }, [id])

    const handleClaim = async () => {
        try {
            const response = await fetch(`/api/items/${id}/claim`, { method: 'POST' })
            if (!response.ok) {
                throw new Error('Failed to claim item')
            }
            toast({ title: "Claim Submitted", description: "Your claim has been submitted successfully." })
            setClaimSubmitted(true)
            setShowContact(true)
        } catch (error) {
            setClaimSubmitted(true)
            setShowContact(true)
            console.error('Error claiming item:', error)
            toast({ title: "Error", description: "Failed to submit claim. Please try again.", variant: "destructive" })
        }
    }

    const handleComment = async () => {
        if (!comment.trim()) {
            toast({ title: "Error", description: "Comment cannot be empty.", variant: "destructive" });
            return;
        }

        try {
            const response = await fetch(`/api/items/${id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment })
            });

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            toast({ title: "Comment Posted", description: "Your comment has been posted successfully." });
            setComment('');
            setItem((prevItem) => {
                if (!prevItem) return prevItem;
                return {
                    ...prevItem,
                    comments: [...(prevItem.comments || []), comment]
                }
            });
        } catch (error) {
            console.error('Error posting comment:', error);
            toast({ title: "Error", description: "Failed to post comment. Please try again.", variant: "destructive" });
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (!item) {
        return <div className="container mx-auto px-4 py-8">Item not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>{item.itemName}</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                            {item.type === "lost" ? "Lost" : "Found"}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {item.imageUrl && (
                        <div
                            className="w-full h-80 relative rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setShowFullImage(true)}
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.itemName}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    )}
                    <p className="text-muted-foreground">{item.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.createdAt}
                    </div>
                    {item.reward && (
                        <div className="text-sm font-medium text-green-600">
                            Reward: {item.reward}
                        </div>
                    )}
                    {item.returnRequirement && (
                        <div className="text-sm font-medium">
                            <AlertTriangle className="w-4 h-4 inline-block mr-1" />
                            Return Requirement: {item.returnRequirement}
                        </div>
                    )}

                    <AnimatePresence>
                        {claimSubmitted && (
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: showContact ? 1 : 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="font-semibold">Contact Information</h3>
                                <div className="flex items-center text-sm">
                                    <User className="w-4 h-4 mr-1" />
                                    {item.contactName}
                                </div>
                                <div className="flex items-center text-sm">
                                    <Phone className="w-4 h-4 mr-1" />
                                    {item.contactPhone}
                                </div>
                                <div className="flex items-center text-sm">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {item.contactEmail}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    {!claimSubmitted ? (
                        <Button className="w-full" onClick={handleClaim}>
                            {item.type === "lost" ? "I Found This Item" : "Claim This Item"}
                        </Button>
                    ) : (
                        <p className="text-center text-sm text-muted-foreground">Contact the person directly to claim your item.</p>
                    )}
                    <div className="w-full space-y-2">
                        <Textarea
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button variant="outline" className="w-full" onClick={handleComment}>
                            Post Comment
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setShowComments(!showComments)}
                    >
                        {showComments ? "Hide Comments" : "View Comments"}
                    </Button>
                    <AnimatePresence>
                        {showComments && item.comments && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-2 mt-4"
                            >
                                {item.comments.length > 0 ? (
                                    item.comments.map((comment, index) => (
                                        <div key={index} className="text-muted-foreground">
                                            <p>{comment as React.ReactNode}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No comments yet.</p>
                                )}

                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardFooter>
            </Card>

            <AnimatePresence>
                {showFullImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowFullImage(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl max-h-[90vh] w-full h-full"
                            onClick={(e: Event) => e.stopPropagation()}
                        >
                            <Button
                                className="absolute top-4 right-4 z-10"
                                size="icon"
                                variant="secondary"
                                onClick={() => setShowFullImage(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <Image
                                src={item.imageUrl}
                                alt={item.itemName}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
