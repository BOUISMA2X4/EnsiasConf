import { redirect } from "next/navigation";
import PerPageDropdown from "~/components/call/call-history-per-page-dropdown";
import DeleteCallActions from "~/components/call/delete-call-actions";
import CallHistoryPagination from "~/components/call/pagination";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { 
    Table, 
    TableHeader, 
    TableRow,
    TableHead, 
    TableBody, 
    TableCell 
} from "~/components/ui/table";
import { getCurrentUser } from "~/lib/session";
import { cn } from "~/lib/utils";
import { prisma } from "~/server/db";

export default async function HistoryPage({ 
    searchParams 
}: {
    searchParams: { 
        page: string,
        per_page: string,
    }
}){

    const user = await getCurrentUser();

    if(searchParams.page === undefined || searchParams.per_page === undefined){
        redirect("/calls/history?page=1&per_page=10")
    }

    const { page, per_page } = searchParams;

    if (!user) {
      redirect("/login")
    }
  
    const supabase = createServerComponentClient({ cookies });

    // fetch paginated calls
    const { data: calls, error: callsError } = await supabase
      .from("calls")
      .select("*, participants(*)")
      .eq("userId", user.id)
      .order("startTime", { ascending: false })
      .range(
        (parseInt(page) - 1) * parseInt(per_page),
        (parseInt(page) - 1) * parseInt(per_page) + parseInt(per_page) - 1
      );
    
    if (callsError) {
      console.error("Erreur Supabase (calls) :", callsError.message);
    }
    
    // fetch total count
    const { count: totalCalls, error: countError } = await supabase
      .from("calls")
      .select("*", { count: "exact", head: true })
      .eq("userId", user.id);
    
    if (countError) {
      console.error("Erreur Supabase (count) :", countError.message);
    }

    const perPageOptions = [10, 20, 30];
    const selectedPerPage = parseInt(per_page, 10);
    const totalPages = Math.ceil((totalCalls ?? 0) / selectedPerPage);

    

    return (
        <div className="container max-w-[1400px] mb-12 mx-auto">
            <h1 className="text-2xl md:text-[30px] font-semibold leading-tight mb-1">Call history</h1>
            <p className="text-muted-foreground mb-8">Review your past interactions and revisit meaningful moments</p>
    
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Call name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Start time</TableHead>
                            <TableHead>End time</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            
                            calls && calls.length !== 0 ? (

                                calls.map((call) => (
                                    <TableRow key={call.id}>
                                        <TableCell className={cn("font-medium truncate py-2")}>{call.title}</TableCell>
                                        <TableCell className={cn("w-40 py-2")}>{new Date(call.startTime).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</TableCell>
                                        <TableCell className={cn("w-40 py-2")}>{new Date(call.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                        <TableCell className={cn("w-40 py-2")}>{call.endTime ? new Date(call.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'null'}</TableCell>
                                        <TableCell className={cn("w-20 py-2")}>
                                            <DeleteCallActions callId={call.id}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="w-full flex mt-4 gap-8 items-center">
                <div className="flex-grow hidden sm:block"></div>
                <PerPageDropdown 
  options={perPageOptions}
  page={page}
  selectedPerPage={selectedPerPage}
  totalCalls={totalCalls ?? 0}
/>

                <span className="text-sm">Page {page}</span>
                <CallHistoryPagination 
                    page={page} 
                    per_page={per_page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}