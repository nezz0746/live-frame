import { silkScreen } from "@lib/fonts";
import { cn } from "@lib/utils";
import React from "react";

const ColorfulText = ({
  text,
  className,
  ...rest
}: { text: string } & React.HTMLAttributes<HTMLParagraphElement>) => {
  // Define an array of colors
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F833FF", "#FF8333"];

  // Split the text into an array of characters
  const textChars = text.split("");

  return (
    <p {...rest} className={cn(className, silkScreen.className)}>
      {textChars.map((char, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
          {char}
        </span>
      ))}
    </p>
  );
};

export default ColorfulText;
