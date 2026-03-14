import Link from "next/link";
import Image from "next/image";

export default function LandingFooter() {
	return (
		<footer className="relative z-10 border-t-2 border-gray-900 bg-white">
			<div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-sm">
						<div className="flex items-center gap-3 mb-4">
							<Image
								src="/logo.png"
								alt="CareerSprint by i2i industry"
								width={200}
								height={56}
								className="h-12 w-auto object-contain"
								priority
							/>
						</div>
						<p className="text-sm text-gray-700 font-medium">
							Targeted exam and interview preparation to turn ambition into 
							<strong className="font-black text-[#0F6FFF]"> interview-ready impact</strong>.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
						<div>
							<h3 className="mb-3 font-black text-gray-900 uppercase tracking-widest text-xs">Product</h3>
							<ul className="space-y-4 text-gray-600 font-bold">
								<li>
									<Link href="/#about" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										About
									</Link>
								</li>
								<li>
									<Link href="/#features" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										Features
									</Link>
								</li>
								<li>
									<Link href="/#how-it-works" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										How it works
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-black text-gray-900 uppercase tracking-widest text-xs">For candidates</h3>
							<ul className="space-y-4 text-gray-600 font-bold">
								<li>
									<Link href="/auth/register" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										Get started
									</Link>
								</li>
								<li>
									<Link href="/exam" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										Practice exams
									</Link>
								</li>
								<li>
									<Link href="/dashboard" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										Dashboard
									</Link>
								</li>
							</ul>
						</div>

						<div className="hidden sm:block">
							<h3 className="mb-3 font-black text-gray-900 uppercase tracking-widest text-xs">Company</h3>
							<ul className="space-y-4 text-gray-600 font-bold">
								<li>
									<Link href="/about" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										About us
									</Link>
								</li>
								<li>
									<Link href="/features" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
										Our features
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-gray-900 pt-6 text-xs text-gray-800 font-bold sm:flex-row">
					<p>
						© {new Date().getFullYear()} CareerSprint by i2i industry. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<Link href="/terms" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
							Terms
						</Link>
						<span className="h-2 w-2 bg-gray-900" />
						<Link href="/privacy" className="hover:text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
							Privacy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

