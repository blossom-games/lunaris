"use strict";

window.addEventListener("DOMContentLoaded", () => {
	const overlay = document.createElement("div");

	overlay.className = "course-overlay";

	overlay.innerHTML = `
		<div class="course-panel" role="status" aria-live="polite">
			<h1>Advanced Calculus Courses</h1>

			<p>
				Welcome to our advanced mathematics learning environment designed for
				high school students and above. This platform helps students build a
				deeper understanding of important calculus concepts including limits,
				derivatives, integrals, differential equations, sequences, and infinite
				series. Lessons are organized to support both classroom instruction and
				independent learning while encouraging problem-solving, critical
				thinking, and academic growth.
			</p>

			<p>
				Our system prepares personalized course modules and interactive learning
				materials for your current session. Students may access guided practice,
				examples, review activities, instructional videos, and step-by-step
				mathematical explanations created to strengthen conceptual
				understanding. Course content is continuously organized to ensure a
				smooth and effective educational experience for all learners.
			</p>

			<p>
				To help maintain a safe and focused digital learning environment, this
				network uses
				:contentReference[oaicite:0]{index=0}
				content filtering and student safety tools. Securly helps schools
				protect students online by monitoring for unsafe or inappropriate web
				content, blocking harmful websites, reducing distractions during class
				time, and supporting responsible technology use across school-managed
				devices and accounts.
			</p>

			<p>
				Securly can assist educators and school administrators by helping
				enforce district internet policies, promoting digital citizenship, and
				encouraging safer online habits. These protections are designed to help
				students stay focused on learning activities while reducing exposure to
				content that may be unsafe, disruptive, or unrelated to educational
				goals.
			</p>

			<p>
				Preparing lesson materials, verifying learning modules, synchronizing
				educational resources, and loading your secure academic workspace for
				the current session.
			</p>
		</div>
	`;

	document.body.appendChild(overlay);

	setTimeout(() => overlay.classList.add("hidden"), 2500);
	setTimeout(() => overlay.remove(), 3200);
});