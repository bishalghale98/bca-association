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
import careerGoals from "@/careerGoals.json"
import semesters from '@/semesters.json'
import { Loader2 } from "lucide-react";





// Predefined options
// const careerGoals = [
//   "Software Developer",
//   "Web Developer",
//   "Full-Stack Developer",
//   "Backend Developer",
//   "Frontend Developer",
//   "Mobile App Developer",
//   "UI/UX Designer",
//   "Social Media Handling",
//   "Data Scientist",
//   "Cloud Engineer",
//   "DevOps Engineer",
//   "Product Manager",
// ];

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
      fullName: '',
      rollNumber: '',
      semester: '',
      email: '',
      phone: '',
      careerGoal: '',
      skills: [],      // ✅ array
      events: [],      // ✅ array
      contacted: false,
      suggestions: ''
    }
  });


  const isContactedChecked = form.watch("contacted");



  async function onSubmit(data: z.infer<typeof formSchema>) {

    console.log(data)

    setIsSubmitting(true);

    try {
      const result = await axios.post("/api/form", data)

      const res: ApiResponse = result.data

      toast.success("success", {
        description: res.message
      })

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border-0">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              BCA Student Registration
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm">
              Join our community and shape your career path
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Personal Information
                </h3>

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Full Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Roll Number and Semester */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rollNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Roll Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your roll number"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
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
                        <FormLabel className="text-sm font-medium">Semester <span className="text-red-500">*</span></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>

                            {semesters.map((semester, index) => (
                              <SelectItem key={index} value={semester.value}>{semester.title}</SelectItem>

                            ))}


                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
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
                        <FormLabel className="text-sm font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="string"
                            placeholder="Enter your phone number"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Career Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Career Information
                </h3>

                {/* Career Goal */}
                <FormField
                  control={form.control}
                  name="careerGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Career Goal *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select your career goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>

                          {careerGoals.map((goal, index) => (
                            <SelectItem key={index} value={goal.title}>
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
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {skillsOptions.map((skill) => (
                          <FormField
                            key={skill}
                            control={form.control}
                            name="skills"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={skill}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(skill)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, skill])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== skill
                                            )
                                          )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {skill}
                                  </FormLabel>
                                </FormItem>
                              )
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
                      <FormDescription>
                        Select the types of events you&apos;d like to participate in
                      </FormDescription>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {eventsOptions.map((event) => (
                          <FormField
                            key={event}
                            control={form.control}
                            name="events"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={event}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(event)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, event])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== event
                                            )
                                          )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {event}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Additional Information
                </h3>

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
                          className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          I agree to be contacted for upcoming events and opportunities
                        </FormLabel>
                        <FormDescription>
                          You can unsubscribe from communications at any time
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !isContactedChecked}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 
  hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg 
  transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg 
  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}