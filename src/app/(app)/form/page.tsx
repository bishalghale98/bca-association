"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { formSchema } from "@/schemas/StudentsForm";
import axios from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import careerGoals from "@/careerGoals.json";
import semesters from "@/semesters.json";
import { Loader2, User, GraduationCap, Target, MessageSquare } from "lucide-react";
import { handleAxiosError } from "@/lib/helper/errorHandler";

const skillsOptions = [
  "React",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "HTML/CSS",
  "UI/UX Design",
  "Database Management",
  "Git & GitHub",
  "AWS/Cloud",
  "Mobile Development",
  "Machine Learning",
  "Data Structures",
  "Networking",
];

const eventsOptions = [
  "Hackathon Participation",
  "Tech Workshops",
  "Coding Competitions",
  "Seminar Attendance",
  "Project Exhibition",
  "Guest Lectures",
  "Industry Visits",
  "Career Guidance Sessions",
];

export default function StudentRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      rollNumber: "",
      semester: "",
      email: "",
      phone: "",
      careerGoal: "",
      skills: [],
      events: [],
      contacted: false,
      suggestions: "",
    },
  });

  const isContactedChecked = form.watch("contacted");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const result = await axios.post("/api/form", data);
      const res: ApiResponse = result.data;

      toast.success("Registration Successful!", {
        description: res.message,
      });

      form.reset();
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-brr from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            BCA Association
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our vibrant community of future tech leaders. Shape your career path with us.
          </p>
        </div>

        {/* Enhanced Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar Progress */}
            <div className="lg:col-span-4 bg-linear-to-b from-blue-600 to-purple-700 p-8 text-white">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Info</h3>
                    <p className="text-blue-100 text-sm">Basic details</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Career Goals</h3>
                    <p className="text-blue-100 text-sm">Your aspirations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Additional Info</h3>
                    <p className="text-blue-100 text-sm">Final touches</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-4 bg-white/10 rounded-2xl">
                <p className="text-sm text-blue-100">
                  Join 500+ students who have join BCA association and are shaping their future with us.
                </p>
              </div>
            </div>

            {/* Form Content */}
            <div className="lg:col-span-8 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-2xl">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                        <p className="text-sm text-muted-foreground">Enter your basic details</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium flex items-center">
                              Full Name
                              <span className="text-destructive ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Roll Number and Semester */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="rollNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium flex items-center">
                                Roll Number
                                <span className="text-destructive ml-1">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your roll number"
                                  className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="semester"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium flex items-center">
                                Semester
                                <span className="text-destructive ml-1">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2">
                                    <SelectValue placeholder="Select semester" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {semesters.map((semester, index) => (
                                    <SelectItem key={index} value={semester.value} className="py-3">
                                      {semester.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email and Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium flex items-center">
                                Email
                                <span className="text-destructive ml-1">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your.email@example.com"
                                  type="email"
                                  className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium flex items-center">
                                Phone Number
                                <span className="text-destructive ml-1">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="string"
                                  placeholder="Enter your phone number"
                                  className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Career Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-2xl">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Career Information</h3>
                        <p className="text-sm text-muted-foreground">Your goals and interests</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Career Goal */}
                      <FormField
                        control={form.control}
                        name="careerGoal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium flex items-center">
                              Career Goal
                              <span className="text-destructive ml-1">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2">
                                  <SelectValue placeholder="Select your career goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {careerGoals.map((goal, index) => (
                                  <SelectItem key={index} value={goal.title} className="py-3">
                                    {goal.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Skills */}
                      <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Skills Interested In</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 p-4 bg-slate-50 rounded-2xl border">
                              {skillsOptions.map((skill) => (
                                <FormField
                                  key={skill}
                                  control={form.control}
                                  name="skills"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={skill}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(skill)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, skill])
                                                : field.onChange(
                                                  field.value?.filter((value) => value !== skill)
                                                );
                                            }}
                                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer flex-1 hover:text-blue-600 transition-colors">
                                          {skill}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Events Interested */}
                      <FormField
                        control={form.control}
                        name="events"
                        render={() => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Events Interested In</FormLabel>
                            <FormDescription className="text-xs">
                              Select the types of events you&apos;d like to participate in
                            </FormDescription>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 p-4 bg-slate-50 rounded-2xl border">
                              {eventsOptions.map((event) => (
                                <FormField
                                  key={event}
                                  control={form.control}
                                  name="events"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={event}
                                        className="flex flex-row items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(event)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, event])
                                                : field.onChange(
                                                  field.value?.filter((value) => value !== event)
                                                );
                                            }}
                                            className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal cursor-pointer flex-1 hover:text-purple-600 transition-colors">
                                          {event}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-2xl">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">Additional Information</h3>
                        <p className="text-sm text-muted-foreground">Share your feedback</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Suggestions */}
                      <FormField
                        control={form.control}
                        name="suggestions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Suggestions</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your suggestions or feedback for the BCA association..."
                                className="min-h-[120px] resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 border-2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Contacted */}
                      <FormField
                        control={form.control}
                        name="contacted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-2xl border-2 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-2 leading-none">
                              <FormLabel className="text-base font-semibold cursor-pointer text-foreground">
                                I agree to be contacted for upcoming events and opportunities
                              </FormLabel>
                              <FormDescription className="text-sm">
                                You&apos;ll receive updates about workshops, hackathons, and career opportunities. You can unsubscribe at any time.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Enhanced Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isContactedChecked}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Registration...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        <span>Complete Registration</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}