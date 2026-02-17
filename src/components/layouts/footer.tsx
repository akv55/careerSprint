import Link from "next/link";
import Image from "next/image";

export default function LandingFooter() {
	return (
		<footer className="border-t border-[#e4ecff] bg-white/90 backdrop-blur">
			<div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
					<div className="max-w-sm">
						<div className="flex items-center gap-3 mb-4">
							<Image
								src="/logo.png"
								alt="CareerSprint by i2i industry"
								width={180}
								height={56}
								className="h-12 w-auto object-contain"
								priority
							/>
						</div>
						<p className="text-sm text-gray-600">
							AI-powered exam and interview preparation to turn ambition into
								<strong className="font-semibold text-[#0F6FFF]"> interview-ready impact</strong>.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-sm">
						<div>
							<h3 className="mb-3 font-semibold text-gray-900">Product</h3>
							<ul className="space-y-2 text-gray-600">
								<li>
									<Link href="/#about" className="hover:text-[#0F6FFF] transition-colors">
										About
									</Link>
								</li>
								<li>
									<Link href="/#features" className="hover:text-[#0F6FFF] transition-colors">
										Features
									</Link>
								</li>
								<li>
									<Link href="/#how-it-works" className="hover:text-[#0F6FFF] transition-colors">
										How it works
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="mb-3 font-semibold text-gray-900">For candidates</h3>
							<ul className="space-y-2 text-gray-600">
								<li>
									<Link href="/auth/register" className="hover:text-[#0F6FFF] transition-colors">
										Get started
									</Link>
								</li>
								<li>
									<Link href="/exam" className="hover:text-[#0F6FFF] transition-colors">
										Practice exams
									</Link>
								</li>
								<li>
									<Link href="/dashboard" className="hover:text-[#0F6FFF] transition-colors">
										Dashboard
									</Link>
								</li>
							</ul>
						</div>

						<div className="hidden sm:block">
							<h3 className="mb-3 font-semibold text-gray-900">Company</h3>
							<ul className="space-y-2 text-gray-600">
								<li>
									<Link href="/about" className="hover:text-[#0F6FFF] transition-colors">
										About us
									</Link>
								</li>
								<li>
									<Link href="/features" className="hover:text-[#0F6FFF] transition-colors">
										Our features
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#eef2ff] pt-6 text-xs text-gray-500 sm:flex-row">
					<p>
						© {new Date().getFullYear()} CareerSprint by i2i industry. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<Link href="/terms" className="hover:text-[#0F6FFF] transition-colors">
							Terms
						</Link>
						<span className="h-1 w-1 rounded-full bg-gray-300" />
						<Link href="/privacy" className="hover:text-[#0F6FFF] transition-colors">
							Privacy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

