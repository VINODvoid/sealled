"use client"

import { fetchFileInfo } from "@/actions";
import BlurIn from "@/components/blur-in";
import GradualSpacing from "@/components/gradual-spacing";
import ShimmerButton from "@/components/shimmer-button";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RetroGrid from "@/components/ui/retro-grid";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";





export default function Home() {
  const router = useRouter();
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [filename,setFilename] = useState("");
  const [password,setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  function handleDropText() {
    router.push("/drop");
  }
  function handleRetrive()
  {
    setIsDialogOpen(true);
  }
  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsLoading(true);
    const res = await fetchFileInfo(filename,password);
     if (res.success) {
      localStorage.setItem("fileData", res.text!);
      router.push("/view");
      toast.success("File retrieved successfully!");
    } else {
      console.log(res.message);
      toast.error("Failed to retrieve file. Please check your credentials.");
    }
    setIsLoading(false);
  }
  function handleReset() {
    setFilename("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <GradualSpacing className="font-display text-center text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
            text="Drop Your Text, Retrieve It Anytime" />
        </div>
        <div className="w-full max-w-3xl mx-auto">

          <BlurIn className="text-lg md:text-xl lg:text-2xl font-medium text-black dark:text-white leading-relaxed" word="No Account needed  - just name and password. Simple, secure and sealed" />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <ShimmerButton className="shadow-2xl w-full sm:w-auto bg-red-600" onClick={handleDropText}>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">Drop Text</span>
          </ShimmerButton>
          <ShimmerButton className="shadow-2xl w-full sm:w-auto" onClick={handleRetrive}>
             <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Retrieve Text
            </span>
          </ShimmerButton>
        </div>
        
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Retrive Text</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="filename" className="text-sm font-medium">Filename</Label>
            <Input id="filename" value={filename} onChange={(e)=> setFilename(e.target.value)} placeholder="Enter filename" className="w-full" required/>
          </div>
          <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
                required
              />
            </div>
            <DialogFooter className="sm:justify-start gap-2">
                <Button type="submit" className="w-full sm:w-auto">
                {isLoading ? "Retrieving..." : "Retrieve"}
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>
      <RetroGrid/>
    </div>
  );
}
