// pages/Home.jsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Timer,
  TrendingUp,
  Calendar,
  ChevronRight,
  Crown,
  Clock,
  Shield,
  Award,
  Share2
} from "lucide-react";
import HeroSection from "@/components/layout/home/heroSection";
import FastResultSection from "@/components/layout/home/fastResultSection";

const HomeSection = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const resultData = [
    { title: "Today Fix Number", value: "1-6-2-7", bgColor: "bg-pink-50" },
    { title: "Motor Patti", value: "145679", bgColor: "bg-green-50" },
    { title: "Jodi (Bracket)", value: "10-71-62-28", bgColor: "bg-green-50" },
    { title: "Cycle Patti", value: "17×28×10×37", bgColor: "bg-pink-50" }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Fast Updates", value: "Every 5 Min" },
            { icon: TrendingUp, label: "Success Rate", value: "99.9%" },
            { icon: Shield, label: "Secure Results", value: "100%" },
            { icon: Award, label: "User Trust", value: "Verified" },
          ].map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* fast results section */}
      <FastResultSection />


        {/* Notice Board */}
        <Card className="mb-8 shadow-lg border-t-4 border-t-red-500">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              <span className="text-red-600">NOTICE</span>
              <span className="ml-2 text-gray-900">BOARD</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resultData.map((item, index) => (
                <Card key={index} className={`${item.bgColor} shadow-md hover:shadow-lg transition-shadow`}>
                  <CardHeader className="bg-black text-white py-3 text-center">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-center text-gray-900">
                      {item.value}
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center p-4 bg-gray-50">
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Latest Results</h2>
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Result {item}</CardTitle>
                        <Badge variant="secondary">
                          <Timer className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                      <CardDescription>Updated 2 minutes ago</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-indigo-600">
                        189-8
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        View History
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Notify
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="today">
              <div className="text-center py-8 text-gray-500">
                Today's results will appear here
              </div>
            </TabsContent>

            <TabsContent value="yesterday">
              <div className="text-center py-8 text-gray-500">
                Yesterday's results will appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                Get instant notifications and live updates for all results
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Historical Data</CardTitle>
              </CardHeader>
              <CardContent>
                Access comprehensive historical data and trends
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Crown className="w-8 h-8 text-indigo-600 mb-2" />
                <CardTitle>Premium Features</CardTitle>
              </CardHeader>
              <CardContent>
                Enjoy exclusive benefits with our premium membership
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of users who trust our platform for reliable results
          </p>
          <Button size="lg">
            Create Account
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
