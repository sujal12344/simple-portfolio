"use client";
import React from "react";
import { Headers } from "@/data/data";
import { servicesData } from "@/lib/services-utils";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CodeSnippet } from "@/components/services/CodeSnippet";
import { SectionHeader } from "@/components/skills/SectionHeader";

const ServicesSection = () => {
  const servicesHeader = Headers.find((header) => header.name === "services")!;

  // Custom description for services section
  const customHeader = {
    ...servicesHeader,
    description:
      "I build modern full-stack applications with a focus on clean code, high performance, and seamless user experiences.",
  };

  return (
    <div id={servicesHeader.name} className="overflow-x-hidden py-12 relative">
      {/* Background elements */}
      <div className="absolute top-20 left-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {servicesHeader.background}
      </div>
      <div className="absolute bottom-20 right-0 opacity-5 text-2xl min-[500px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono">
        {servicesHeader.backgroundClosing}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader header={customHeader} />

        {/* Service cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <CodeSnippet />
      </div>
    </div>
  );
};

export default ServicesSection;
