"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Plus,
  Upload,
  MapPin,
  User,
  Code,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "@/lib/api";

export default function SkillSwapProfile() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [skillsOffered, setSkillsOffered] = useState<string[]>([
    "React",
    "Node.js",
  ]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([
    "UI/UX Design",
    "Machine Learning",
  ]);
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  const [availability, setAvailability] = useState("weekends");
  const [isPublic, setIsPublic] = useState(true);
  const [bio, setBio] = useState("");

  const addSkillOffered = () => {
    if (
      newSkillOffered.trim() &&
      !skillsOffered.includes(newSkillOffered.trim())
    ) {
      setSkillsOffered([...skillsOffered, newSkillOffered.trim()]);
      setNewSkillOffered("");
    }
  };

  const removeSkillOffered = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  const addSkillWanted = () => {
    if (
      newSkillWanted.trim() &&
      !skillsWanted.includes(newSkillWanted.trim())
    ) {
      setSkillsWanted([...skillsWanted, newSkillWanted.trim()]);
      setNewSkillWanted("");
    }
  };

  const removeSkillWanted = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.user.updateProfile({
        name,
        location,
        skillsOffered,
        skillsWanted,
        public: isPublic,
      });
      console.log({
        name,
        location,
        image,
        skillsOffered,
        skillsWanted,
        availability,
        isPublic,
        bio,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-between gap-3 mb-4 md:flex-row flex-col">
              <h1 className="text-4xl font-bold text-slate-900">
                Update Profile
              </h1>
              <div className="">
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 bg-blue-500 hover:bg-blue-600 text-white shadow-lg cursor-pointer"
                >
                  Create Profile
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Tell us about yourself and what drives your passion for
                      collaboration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-slate-700 font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-slate-200 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-slate-700 font-medium"
                        >
                          Location
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="location"
                            placeholder="City, Country"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-10 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="text-slate-700 font-medium"
                      >
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Share your background, interests, and what motivates you to collaborate with others..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="border-slate-200 focus:border-primary focus:ring-primary resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Section */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Code className="h-5 w-5" />
                      Skills Exchange
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Share what you can teach and what you&apos;d like to learn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Skills Offered */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <Label className="text-slate-700 font-medium">
                          Skills I Can Offer
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {skillsOffered.map((skill) => (
                          <Badge
                            key={skill}
                            className="text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 flex items-center gap-1"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-gray-600"
                              onClick={() => removeSkillOffered(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill you can teach"
                          value={newSkillOffered}
                          onChange={(e) => setNewSkillOffered(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSkillOffered())
                          }
                          className="border-slate-200 focus:border-skill-offered focus:ring-skill-offered"
                        />
                        <Button
                          type="button"
                          onClick={addSkillOffered}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Skills Wanted */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <Label className="text-slate-700 font-medium">
                          Skills I Want to Learn
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {skillsWanted.map((skill) => (
                          <Badge
                            key={skill}
                            className="text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 flex items-center gap-1"
                          >
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-gray-600"
                              onClick={() => removeSkillWanted(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill you want to learn"
                          value={newSkillWanted}
                          onChange={(e) => setNewSkillWanted(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSkillWanted())
                          }
                          className="border-slate-200 focus:border-skill-wanted focus:ring-skill-wanted"
                        />
                        <Button
                          type="button"
                          onClick={addSkillWanted}
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Availability & Preferences */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                      <Calendar className="h-5 w-5" />
                      Availability & Preferences
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Let others know when you&apos;re available to collaborate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-3">
                      <Label className="text-slate-700 font-medium">
                        When are you typically available?
                      </Label>
                      <RadioGroup
                        value={availability}
                        onValueChange={setAvailability}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="weekends"
                            id="weekends"
                            className="border-blue-500 text-blue-500"
                          />
                          <Label htmlFor="weekends" className="text-slate-600">
                            Weekends only
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="weekdays"
                            id="weekdays"
                            className="border-blue-500 text-blue-500"
                          />
                          <Label htmlFor="weekdays" className="text-slate-600">
                            Weekdays
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="both"
                            id="both"
                            className="border-blue-500 text-blue-500"
                          />
                          <Label htmlFor="both" className="text-slate-600">
                            Both weekends and weekdays
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="flexible"
                            id="flexible"
                            className="border-blue-500 text-blue-500"
                          />
                          <Label htmlFor="flexible" className="text-slate-600">
                            Flexible schedule
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {isPublic ? (
                            <Eye className="h-4 w-4 text-primary" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-slate-500" />
                          )}
                          <Label
                            htmlFor="visibility"
                            className="text-slate-700 font-medium"
                          >
                            Profile Visibility
                          </Label>
                        </div>
                        <p className="text-sm text-slate-500">
                          {isPublic
                            ? "Your profile is visible to all users"
                            : "Your profile is private"}
                        </p>
                      </div>
                      <Switch
                        id="visibility"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Picture & Preview */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-800">
                      Profile Picture
                    </CardTitle>
                    <CardDescription>
                      Upload a photo to help others recognize you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center overflow-hidden bg-slate-50">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                              <p className="text-sm text-slate-500">
                                Upload Image
                              </p>
                            </div>
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-4 border-slate-200"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Preview */}
                <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-slate-50">
                  <CardHeader>
                    <CardTitle className="text-slate-800">
                      Profile Preview
                    </CardTitle>
                    <CardDescription>
                      How others will see your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden ring-2 ring-primary/20">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="h-6 w-6 text-slate-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {name || "Your Name"}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {location || "Your Location"}
                          </p>
                        </div>
                      </div>

                      {skillsOffered.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-700 mb-2">
                            Can teach:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {skillsOffered.slice(0, 2).map((skill) => (
                              <Badge
                                key={skill}
                                className="text-green-700 bg-green-50 border border-green-200 text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {skillsOffered.length > 2 && (
                              <Badge className="bg-slate-200 text-slate-600 text-xs border-0">
                                +{skillsOffered.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {skillsWanted.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-700 mb-2">
                            Wants to learn:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {skillsWanted.slice(0, 2).map((skill) => (
                              <Badge
                                key={skill}
                                className="text-amber-800 bg-amber-50 border border-amber-200 text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {skillsWanted.length > 2 && (
                              <Badge className="bg-slate-200 text-slate-600 text-xs border-0">
                                +{skillsWanted.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {availability === "weekends" && "Available weekends"}
                        {availability === "weekdays" && "Available weekdays"}
                        {availability === "both" &&
                          "Available weekends & weekdays"}
                        {availability === "flexible" && "Flexible schedule"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
          </form>
        </div>
      </div>
    </>
  );
}
