"use client";

import { Loader } from "@/components/ui/loader";


const Loading = () => {
  return ( 
    <div className="flex h-screen w-full items-center justify-center min-h-screen">
      <Loader />
    </div>
   );
}
 
export default Loading;