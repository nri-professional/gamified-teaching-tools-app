/*
  NOTE (generated code trace):
  The Profile page was implemented/updated in response to the user's request:

  "Edit the profile page to display a card of the email they registered with and how many classes they've made and completed."

  The card reads the authenticated user (via `useUser()`) and the classes/progress via `useClasses()`.
*/

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/lib/useUser';
import { useClasses } from '../ClassesContext';

export default function Page() {
  const { user, loading } = useUser();
  const { classes, getProgress } = useClasses();

  const myClasses = classes.filter((c) => c.owner === 'me');
  const createdCount = myClasses.length;
  const completedCount = myClasses.filter((c) => {
    const prog = getProgress(c.id) || [];
    return c.qaList.length > 0 && prog.filter(Boolean).length === c.qaList.length;
  }).length;

  return (
    <section className="w-full flex justify-center">
      <Card className="w-full max-w-[85vw] border-2 border-white bg-transparent text-slate-50 rounded-3xl backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl tracking-[0.25em]">Profile</CardTitle>
          <p className="text-sm text-slate-100">Account info</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="rounded-xl border border-black/40 bg-black/20 px-4 py-6">
                <div className="text-sm text-slate-300">Registered Email</div>
                <div className="text-lg font-semibold mt-2 text-slate-50">{loading ? 'Loading...' : user?.email ?? 'Not signed in'}</div>
              </div>
            </div>

            <div className="w-64 space-y-4">
              <div className="rounded-xl border border-black/40 bg-black/20 px-4 py-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300">Classes Created</div>
                  <div className="text-xl font-semibold text-slate-50">{createdCount}</div>
                </div>
              </div>

              <div className="rounded-xl border border-black/40 bg-black/20 px-4 py-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-300">Classes Completed</div>
                  <div className="text-xl font-semibold text-slate-50">{completedCount}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
