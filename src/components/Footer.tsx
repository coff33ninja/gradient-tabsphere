import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t p-4 flex justify-center items-center gap-4 z-50">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Found an issue?</span>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          asChild
        >
          <a
            href="https://github.com/coff33ninja/WEBLIB/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.github className="h-4 w-4" />
            Report on GitHub
          </a>
        </Button>
        <span>or</span>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          asChild
        >
          <a
            href="https://github.com/coff33ninja/WEBLIB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.github className="h-4 w-4" />
            Fork me on GitHub
          </a>
        </Button>
      </div>
    </div>
  );
};