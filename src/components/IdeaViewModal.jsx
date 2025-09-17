"use client";

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Eye,
  Heart,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Target,
  Lightbulb,
  User,
  Mail,
  Phone,
  Award,
  TrendingUp,
} from "lucide-react";

export default function IdeaViewModal({ isOpen, onClose, idea }) {
  if (!idea) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-[#B8860B]" />
            {idea.title}
          </DialogTitle>
          <DialogDescription>
            Detailed view of your business idea
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto flex-1 pr-2">
          {/* Header Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/20"
              >
                {idea.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {idea.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{idea.views || 0} views</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                <span>{idea.likes || 0} likes</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{idea.description}</p>
          </div>

          {/* Business Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment & Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Investment & Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-3 text-[#B8860B]" />
                  <div>
                    <span className="font-medium">Investment Range:</span>
                    <span className="ml-2 text-gray-600">
                      {idea.investmentRange}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-3 text-[#B8860B]" />
                  <div>
                    <span className="font-medium">Time to Start:</span>
                    <span className="ml-2 text-gray-600">
                      {idea.timeToStart}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-[#B8860B]" />
                  <div>
                    <span className="font-medium">Market Size:</span>
                    <span className="ml-2 text-gray-600">
                      {idea.marketSize}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Model */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Business Model
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">Model:</span>
                  <span className="ml-2 text-gray-600">
                    {idea.businessModel}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Target Audience:</span>
                  <span className="ml-2 text-gray-600">
                    {idea.targetAudience}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          {idea.keyFeatures && idea.keyFeatures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {idea.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-3"></div>
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Revenue Streams */}
          {idea.revenueStreams && idea.revenueStreams.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Revenue Streams
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {idea.revenueStreams.map((stream, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 mr-3 text-green-600" />
                    <span className="text-gray-600">{stream}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Skills */}
          {idea.requiredSkills && idea.requiredSkills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Competitive Advantage */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Competitive Advantage
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {idea.competitiveAdvantage}
            </p>
          </div>

          {/* Challenges */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Potential Challenges
            </h3>
            <p className="text-gray-600 leading-relaxed">{idea.challenges}</p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-sm">
                <User className="w-4 h-4 mr-3 text-[#B8860B]" />
                <div>
                  <span className="font-medium">Uploaded by:</span>
                  <span className="ml-2 text-gray-600">
                    {idea.uploadedByName}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-3 text-[#B8860B]" />
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2 text-gray-600">
                    {idea.contactInfo?.email}
                  </span>
                </div>
              </div>
              {idea.contactInfo?.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-[#B8860B]" />
                  <div>
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2 text-gray-600">
                      {idea.contactInfo.phone}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-3 text-[#B8860B]" />
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white">
            <Award className="w-4 h-4 mr-2" />
            Edit Idea
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
