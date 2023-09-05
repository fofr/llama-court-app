// pages/ChooseRoom.js
import { Special_Elite } from 'next/font/google';
import Link from 'next/link';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin']
})

const ChooseRoom = () => {
  return (
    <div>
      <div className="container max-w-4xl mx-auto md:px-8 px-4 py-4 pb-10 bg-white border-black min-h-screen">
        <div className="flex items-start">
          <div className="w-1/3">
            <img src="/llama-court.webp" alt="A picture of a llama judge" className="my-6" />
          </div>
          <div className="w-2/3">
            <h1 className={'md:text-6xl text-2xl mt-8 mb-10 font-bold ' + specialElite.className}>
              Llama court<br />is now in session
            </h1>
            <p className="text-lg">
              We used Llama 2 to build an AI court room, where famous characters debate cases with each other as jurors. Watch autonomous agents Homer and Aristotle debate garden gnome thefts. Or Einstein and Yoda discuss illegal time travel.
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-start">
          <div className="w-1/3 rounded pr-6">
            <img src="/court-house.webp" alt="A picture of a court room" className="rounded" />
          </div>
          <div className="w-2/3">
            <h2 className={'mb-8 md:text-4xl text-2xl font-bold ' + specialElite.className}>
              Pick a courtroom to watch
            </h2>
            <ul className="mb-12 mt-6 space-y-4">
              <li>
                <Link
                  className={'md:text-2xl text-xl underline ' + specialElite.className}
                  href="/A"
                >
                  Courtroom&nbsp;A
                </Link>

                <p className="text-lg">Aristotle, Homer Simpson, Agatha Christie, Nikola Tesla, Dana Scully, Lieutenant Worf</p>
              </li>
              <li>
                <Link
                  className={'md:text-2xl text-xl underline ' + specialElite.className}
                  href="/B"
                >
                  Courtroom&nbsp;B
                </Link>

                <p className="text-lg">Yoda, Albert Einstein, Napoleon Bonaparte, Count Dracula, Mother Teresa, Mikhail Bakunin</p>
              </li>
              <li>
                <Link
                  className={'md:text-2xl text-xl underline ' + specialElite.className}
                  href="/C"
                >
                  Courtroom&nbsp;C
                </Link>

                <p className="text-lg">Al Capone, The Log Lady, MacGyver, Confucius, Marie Curie, The Terminator</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-start">
          <div className="w-1/3 rounded pr-6">
            <img src="/how-it-works.webp" alt="A picture of a court room with cogs in it" className="rounded" />
          </div>
          <div className="w-2/3">
            <h2 className={'mb-8 md:text-4xl text-2xl font-bold ' + specialElite.className}>
              How does Llama Court work?
            </h2>
            <div className="text-lg mt-4 space-y-4">
              <p>
                Llama Court is a simulation of a jury deliberation where each jury member is an AI agent. It is open source so you can dive into the <a className="underline" href="https://github.com/andreasjansson/llama-jury">agent code</a> and <a className="underline" href="https://github.com/fofr/llama-court-app">frontend code</a> to see exactly how it works.
              </p>
              <p>
                There are three simulated court rooms, each with a jury consisting of six members. Each member has their own personality and opinions.
              </p>
              <p>
                Each jury member has their own:
              </p>
              <ul className="list-disc ml-6">
                <li>summary of the facts of the case</li>
                <li>mood</li>
                <li>beliefs about the case</li>
                <li>probability that the defendant is guilty or innocent</li>
                <li>opinions about other jury members</li>
              </ul>
              <p>
                At the beginning of a court session the evidence is presented, witnesses are heard and prosecution and defense make their statements. During this time the agents update their summaries of facts, mood, beliefs, and probability of guilt/innocence.
              </p>
              <p>
                After the closing statements, the jury goes into deliberation. Each agent decides how eager they are to speak and a weighted average of &ldquo;speak eagerness&rdquo; is used to pick the next speaker.
              </p>
              <p>
                After an agent has spoken, all the other agents update their mood, beliefs, probability of guilty/innocent, and opinion about the current speaker. Then &ldquo;speak eagerness&rdquo; is computed again and another agent makes a statement. This process is repeated until all agents are certain of the defendant&#39;s guilt or innocence.
              </p>
              <p>
                The court transcript is generated by GPT-4 at the beginning of a session. The agent state is generated and updated by <a href="https://replicate.com/a16z-infra/llama-2-13b-chat" className="underline">Llama 2 13B-chat</a> running on Replicate. Images are generated by <a className="underline" href="https://replicate.com/stability-ai/sdxl">SDXL</a> based on the current mood of the agent.
              </p>
              <p>
                The overall agent architecture was inspired by the <a className="underline" href="https://en.wikipedia.org/wiki/Belief%E2%80%93desire%E2%80%93intention_software_model">Belief-Desire-Intention model</a> and the social relations model used by <a className="underline" href="https://gama-platform.org/wiki/BDIAgents_step3">GAMA</a>. There are so many great multi-agent systems papers from the 1990s waiting to be rediscovered!
              </p>
            </div>
          </div>
        </div>

        <footer className={`mt-10 text-xl text-center`}>
          Built with 🤖 by <a
            href="https://replicate.com/?utm_source=project&utm_campaign=llama-court"
            title="Replicate"
            className="inline-block -ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="m-3 -mb-2 w-40 fill-current"
              viewBox="0 0 512 120"
            >
              <polygon points="86.96 0 86.96 10.74 12.03 10.74 12.03 95.41 0 95.41 0 0 86.96 0"></polygon>
              <polygon points="86.96 20.37 86.96 31.11 34.75 31.11 34.75 95.41 22.71 95.41 22.71 20.37 86.96 20.37"></polygon>
              <polygon points="86.96 40.67 86.96 51.47 57.46 51.47 57.46 95.41 45.42 95.41 45.42 40.67 86.96 40.67"></polygon>
              <path d="m121.21,39.62c14.32,0,26.35,9.5,26.35,27.16,0,1.17,0,2.16-.12,3.95h-43.02c.56,8.95,7.78,14.87,16.85,14.87,7.65,0,12.78-3.52,15.61-8.33l9.2,6.54c-4.94,7.78-13.45,12.71-24.93,12.71-16.6,0-28.57-11.79-28.57-28.45.06-16.11,12.03-28.45,28.64-28.45m-16.17,22.28h30.43c-1.3-7.9-7.65-12.16-14.69-12.16s-14.13,4.07-15.74,12.16"></path>
              <path d="m159.78,40.67h12.03v7.34c3.09-4.38,9.75-8.39,17.59-8.39,15,0,26.35,12.78,26.35,28.45s-11.36,28.45-26.35,28.45c-7.9,0-14.57-4.07-17.59-8.46v30.18h-12.03V40.67Zm27.46,9.87c-9.75,0-16.42,7.65-16.42,17.53s6.67,17.53,16.42,17.53,16.29-7.65,16.29-17.53-6.67-17.53-16.29-17.53"></path>
              <rect x="228.04" y="13.33" width="12.03" height="82.02"></rect>
              <path d="m262.3,28.76c-4.38,0-8.08-3.58-8.08-8.08s3.7-7.96,8.08-7.96,7.96,3.64,7.96,7.96c0,4.51-3.46,8.08-7.96,8.08m-5.99,11.91h12.03v54.68h-12.03v-54.68Z"></path>
              <path d="m309.45,96.46c-16.42,0-28.88-12.28-28.88-28.45s12.47-28.45,28.88-28.45c11.29,0,20.8,6.05,25.49,15.12l-10.49,5.68c-2.65-5.55-7.96-9.63-15-9.63-9.75,0-16.6,7.53-16.6,17.28s6.91,17.28,16.6,17.28c6.97,0,12.34-4.07,15-9.63l10.49,5.68c-4.69,9.13-14.26,15.12-25.49,15.12"></path>
              <path d="m368.39,39.62c7.9,0,14.44,4.07,17.53,8.39v-7.34h12.03v54.68h-12.03v-7.34c-3.09,4.38-9.63,8.46-17.53,8.46-15,0-26.35-12.78-26.35-28.45s11.36-28.39,26.35-28.39m2.22,10.92c-9.75,0-16.29,7.65-16.29,17.53s6.54,17.53,16.29,17.53,16.29-7.65,16.29-17.53-6.6-17.53-16.29-17.53"></path>
              <polygon points="418.56 95.41 418.56 51.41 407.14 51.41 407.14 40.67 418.56 40.67 418.56 25.49 430.6 25.49 430.6 40.67 451.33 40.67 451.33 51.41 430.6 51.41 430.6 84.61 451.33 84.61 451.33 95.41 418.56 95.41"></polygon>
              <path d="m485.65,39.62c14.32,0,26.35,9.5,26.35,27.16,0,1.17,0,2.16-.12,3.95h-43.02c.56,8.95,7.78,14.87,16.85,14.87,7.65,0,12.78-3.52,15.61-8.33l9.2,6.54c-4.94,7.78-13.45,12.71-24.93,12.71-16.6,0-28.57-11.79-28.57-28.45.12-16.11,12.03-28.45,28.64-28.45m-16.17,22.28h30.43c-1.3-7.9-7.65-12.16-14.69-12.16s-14.07,4.07-15.74,12.16"></path>
            </svg>
          </a>
        </footer>
      </div>
    </div >
  );
};

export default ChooseRoom;
