import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function Page() {
    return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Main Menu placeholder</CardTitle>
                    <CardDescription>Feel free to change anything here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is linked in sign-up-success's page.tsx, 
                        so remember to change that as well if you update this route.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
    )
}