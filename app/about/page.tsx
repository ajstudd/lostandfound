"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, MessageCircle, Shield, Users } from 'lucide-react'
import Link from 'next/link'

const AboutPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <motion.section className="text-center mb-16" {...fadeIn}>
                <h1 className="text-4xl font-bold mb-4">Welcome to Lost Fin</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Reconnecting people with their lost belongings, one item at a time.
                </p>
            </motion.section>

            <motion.section className="grid md:grid-cols-2 gap-8 mb-16" {...fadeIn}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Search className="mr-2" /> For Those Who've Lost
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Lost something valuable? Don't lose hope! Post about your lost item and let our
                            community help you find it. With Lost Fin, you're not searching alone.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Shield className="mr-2" /> For Those Who've Found
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Found an item and want to return it to its rightful owner? List it on Lost Fin
                            and help make someone's day. Your honesty can make a big difference!
                        </p>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section className="mb-16" {...fadeIn}>
                <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Whether you've lost or found an item, create a detailed post about it. Include
                                descriptions, locations, and any other relevant information.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. Connect</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Our community members can comment on posts, providing insights or claiming to
                                have found a lost item. We facilitate safe communication between parties.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>3. Reunite</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Once a match is found, we help coordinate the safe return of the item. Our
                                process ensures authenticity and security for all involved.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.section>

            <motion.section className="mb-16" {...fadeIn}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2" /> Community Contribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            At Lost Fin, we believe in the power of community. Even if you haven't lost or
                            found an item, you can still play a crucial role:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Comment on posts with helpful insights or information</li>
                            <li>Share listings to increase visibility</li>
                            <li>Offer support and encouragement to those searching</li>
                        </ul>
                        <p>
                            Together, we can create a network of support and increase the chances of
                            reuniting people with their lost belongings.
                        </p>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section className="text-center" {...fadeIn}>
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Join our community and be part of something meaningful.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link href="/post/lost">
                        <Button size="lg">
                            Report Lost Item <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                    <Link href="/post/found">
                        <Button size="lg" variant="outline">
                            Report Found Item <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.section>

            <motion.footer
                className="mt-16 text-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <p>© 2024 Lost Fin. All rights reserved.</p>
            </motion.footer>
        </div>
    )
}

export default AboutPage