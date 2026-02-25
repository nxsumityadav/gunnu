"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGroupProps {
  variants?: {
    container?: Record<string, unknown>;
    item?: Record<string, unknown>;
  };
  className?: string;
  children: React.ReactNode;
}

const defaultItemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 1.5,
    },
  },
};

const defaultContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.75,
    },
  },
};

export function AnimatedGroup({
  variants = {},
  className,
  children,
}: AnimatedGroupProps) {
  const containerVariants = (variants.container ??
    defaultContainerVariants) as React.ComponentProps<
    typeof motion.div
  >["variants"];
  const itemVariants = (variants.item ?? defaultItemVariants) as React.ComponentProps<
    typeof motion.div
  >["variants"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={itemVariants} className="contents">
            {child}
          </motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
