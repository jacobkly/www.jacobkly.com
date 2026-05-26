export default function About() {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="title text-2xl sm:text-3xl font-serif">about</h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base">
                <p>
                    I&apos;m a full stack software engineer who mostly lives in
                    the backend. Right now I&apos;m at Junt Industries, building
                    the FastAPI services, Flutter Web CRM, and Azure
                    infrastructure behind the OnSight Real Estate Platform, a
                    SaaS platform for real estate brokerages.
                </p>
                <p>
                    Before Junt Industries I first-authored a research paper on autonomous
                    drone security at UW Tacoma&apos;s SESAIS lab (submitted to
                    an A-ranked international software engineering conference),
                    and led 9 backend developers as Backend Lead of the Tech
                    Startup Club. I graduated UW Tacoma in Aug 2025 with a B.S.
                    in Computer Science and Systems, GPA 3.94.
                </p>
                <p>
                    Fun fact: 8+ years on saxophone, and lately I&apos;m
                    picking up electric guitar to play with my church&apos;s
                    worship team.
                </p>
            </div>
        </section>
    );
}
