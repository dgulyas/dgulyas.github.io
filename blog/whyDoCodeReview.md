# Code Reviews Reasons?

Why do we do code reviews? For the same reason we ask others for romantic advice. I call it self blindness.

Code review offers a chance for fresh eyes to look over a change. When the writer is in the middle of creating a change they often have a lot of state stored in their head. Things like broad system architecture and what the neighbouring functions do. All the different ways they could have solved the problem. This creates a heavy cognitive load. It's harder to see the big picture when you're so focused on the details. A code reviewer comes in free of context and can focus only on the context that's relevant. They're able to look at a change and ignore all the details that don't matter.

If I'm building a patio deck, I might research different methods of support, and look at many different ways others have done it. I might look at the entire perimeter of the house and the yard's layout, finding the best place to attach it. Some or possibly most of this information isn't needed. When I show the deck to my wife, she's not going to judge it based on the context I have, but on whether or not it meets her deck needs.

Some programmers also love to prematurely optimize or over engineer. Having a 2nd opinion can correct for that and ensure quicker delivery.

Code reviews create pressure to impress your teammates. We want our teammates to believe we're competent. Sometimes for the sake of speed, shortcuts can be taken. If we know someone we want to impress is going to look at our code, those shortcuts won't be taken.

From a process perspective, they create multiple points in the process that need to fail for something to go wrong. When a bug gets through and causes an issue, it's not just one person who missed something. (Side note: Ideally the change is also manually tested. This creates a total of 3 points that need to fail for a bug to get through.)

Code reviews are also a great way to learn from each other. I'll see code that uses new features of the language, or touches parts of the system that I'm unfamiliar with. I'll see how someone with 10 more years of experience than me approaches the problem they're solving.

### Negatives

They provide a safety net that can become a crutch. If I'm not familiar with the code I'm modifying, I can skip deep diving into it because I know someone who is familiar with it will review it. Conversely, if I'm reviewing code I'm not familiar with, I can assume that the developer did due diligence, and it's generally correct because they should know more about the code they worked on than I do.

It's very easy for teh reviewer to miss certain things. They're often looking at only what's been changed. That's great for catching the errors in what was added, but not in what's missing. Perhaps a certain function needs to be called, but isn't. Unless the code reviewer is very familiar with the code the change is made in, it's easy for them to miss what's missing.