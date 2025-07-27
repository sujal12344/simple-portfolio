import React from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogModal from "@/components/ui/dialogmodal";
import { ServiceItem, cardVariants } from "@/lib/services-utils";

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, description, icon, details, modalChecks, direction } = service;

  return (
    <motion.div
      custom={direction}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      variants={cardVariants}
      viewport={{ once: true, margin: "-100px" }}
      className="rounded shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Card className="h-full border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
        <CardHeader className="relative pb-0">
          <div className="absolute top-8 right-6 bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="h-0.5 w-12 bg-primary/50 rounded-full mb-4" />
            <p className="text-muted-foreground">{details}</p>
          </div>
        </CardContent>

        <DialogModal
          title={title}
          check1={modalChecks[0]}
          check2={modalChecks[1]}
          check3={modalChecks[2]}
          check4={modalChecks[3]}
        >
          <CardFooter className="pt-0">
            <div className="w-full">
              <div className="flex items-center justify-center group">
                <h3 className="font-medium text-primary group-hover:underline transition-all cursor-pointer">
                  View details
                </h3>
                <MoveRight className="w-5 ml-1 text-primary opacity-70 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardFooter>
        </DialogModal>
      </Card>
    </motion.div>
  );
};
