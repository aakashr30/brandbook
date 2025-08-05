import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export const ScrollArea = ({ children }: { children: React.ReactNode }) => (
    <ScrollAreaPrimitive.Root className="overflow-hidden h-full">
        <ScrollAreaPrimitive.Viewport className="w-full h-full rounded">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="w-2">
            <ScrollAreaPrimitive.Thumb className="bg-gray-400 rounded" />
        </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
);
