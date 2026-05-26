export default function About() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="title text-2xl sm:text-3xl font-serif">about</h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base">
                <p>
                    I build backend systems and cloud infrastructure. Right now
                    I&apos;m at Junt Industries, where I architect the Azure
                    platform behind the OnSight Real Estate Platform, a SaaS
                    platform for real estate brokerages.
                </p>
                <p>
                    Before Junt I first-authored a research paper on autonomous
                    drone security at UW Tacoma&apos;s SESAIS lab (submitted to
                    an A-ranked international software engineering conference),
                    and led 9 backend developers as Backend Lead of the Tech
                    Startup Club. I graduated UW Tacoma in Aug 2025 with a B.S.
                    in Computer Science and Systems, GPA 3.94.
                </p>
                <p>
                    I&apos;ve played saxophone for 8+ years and recently joined
                    my church&apos;s worship band on electric guitar.
                </p>
            </div>
        </section>
    );
}
