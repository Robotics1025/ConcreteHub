"use client";

import { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import MoreHorizRounded from "@mui/icons-material/MoreHorizRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import InstallMobileRounded from "@mui/icons-material/InstallMobileRounded";
import ShoppingBagRounded from "@mui/icons-material/ShoppingBagRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import MilitaryTechRounded from "@mui/icons-material/MilitaryTechRounded";

const donutColors = ["#0B615C", "#B4FDE0", "#36D399", "#0FA9A7"];

const invoices = [
	{ id: "INV-1001", category: "Software", price: "$120.00", status: "Paid", tone: "success" as const },
	{ id: "INV-1002", category: "Service", price: "$250.50", status: "Out of date", tone: "error" as const },
	{ id: "INV-1003", category: "Hardware", price: "$89.99", status: "Progress", tone: "warning" as const },
	{ id: "INV-1004", category: "Consulting", price: "$500.00", status: "Progress", tone: "warning" as const },
];

const customers = [
	{ name: "Acme Builders", color: "#FF6B6B", icon: <EmojiEventsRounded sx={{ color: "#F59E0B" }} /> },
	{ name: "Metro Concrete", color: "#4B6BFB", icon: <MilitaryTechRounded sx={{ color: "#9CA3AF" }} /> },
	{ name: "Skyline Developments", color: "#22C55E", icon: <MilitaryTechRounded sx={{ color: "#D97706" }} /> },
	{ name: "NorthBridge Supply", color: "#0EA5E9", icon: <MilitaryTechRounded sx={{ color: "#6B7280" }} /> },
	{ name: "Prime Foundations", color: "#A855F7", icon: <MilitaryTechRounded sx={{ color: "#C084FC" }} /> },
];

const barSeries = [
	{ label: "Asia", color: "#4F46E5", values: [12, 14, 10, 16, 18, 20, 22, 19, 17, 15, 14, 18] },
	{ label: "Europe", color: "#10B981", values: [8, 9, 12, 11, 14, 13, 15, 16, 15, 13, 12, 14] },
	{ label: "Americas", color: "#F59E0B", values: [6, 7, 8, 9, 11, 12, 13, 11, 10, 9, 8, 10] },
];

const metricCards = [
	{
		title: "Total active users",
		value: "18,765",
		change: "+2.6%",
		trend: "up" as const,
		icon: <PeopleAltRounded sx={{ color: "#0EA960" }} />,
		bars: [2, 3, 4, 3, 5, 7, 6, 8, 9, 7, 6, 8],
		barColor: "#0EA960",
	},
	{
		title: "Total installed",
		value: "4,876",
		change: "+0.2%",
		trend: "up" as const,
		icon: <InstallMobileRounded sx={{ color: "#12A8E0" }} />,
		bars: [1, 2, 3, 3, 4, 5, 6, 6, 7, 6, 7, 6],
		barColor: "#12A8E0",
	},
	{
		title: "Total downloads",
		value: "678",
		change: "-0.1%",
		trend: "down" as const,
		icon: <ShoppingBagRounded sx={{ color: "#F97316" }} />,
		bars: [2, 2, 3, 4, 5, 4, 5, 6, 5, 4, 5, 7],
		barColor: "#F97316",
	},
];

const MiniBars = ({ values, color }: { values: number[]; color: string }) => (
	<Stack direction="row" spacing={0.6} alignItems="flex-end">
		{values.map((v, idx) => (
			<Box
				key={`${v}-${idx}`}
				sx={{
					width: 6,
					height: 6 + v * 6,
					borderRadius: 1,
					bgcolor: color,
					opacity: 0.9,
					boxShadow: "0 4px 8px -4px rgba(0,0,0,0.3)",
				}}
			/>
		))}
	</Stack>
);

const TrendIcon = ({ direction, color }: { direction: "up" | "down"; color: string }) => (
	<Box
		component="svg"
		viewBox="0 0 24 24"
		sx={{
			width: 18,
			height: 18,
			color,
			transform: direction === "down" ? "rotate(180deg)" : "none",
		}}
	>
		<path
			fill="currentColor"
			d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
			opacity="0.4"
		/>
	</Box>
);

const featuredSlides = [
	{
		tag: "ConcreteHub update",
		title: "Material demand insights",
		description: "Spot regional demand shifts and adapt your inventory plans.",
		image:
			"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
	},
	{
		tag: "Fresh release",
		title: "Logistics optimizer",
		description: "Balance delivery routes, fuel, and driver utilization in minutes.",
		image:
			"https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
	},
	{
		tag: "Insight",
		title: "Supplier scorecards",
		description: "Review OTIF, quality, and pricing trends for each supplier.",
		image:
			"https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
	},
];

const Legend = ({ label, color }: { label: string; color: string }) => (
	<Stack direction="row" spacing={1} alignItems="center">
		<Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: color }} />
		<Typography variant="caption" color="text.secondary">
			{label}
		</Typography>
	</Stack>
);

const DonutChart = () => (
	<Box sx={{ display: "grid", placeItems: "center" }}>
		<Box
			sx={{
				position: "relative",
				width: 220,
				height: 220,
				borderRadius: "50%",
				background:
					"conic-gradient(#0B615C 0 32%, #B4FDE0 32% 52%, #36D399 52% 78%, #0FA9A7 78% 100%)",
				display: "grid",
				placeItems: "center",
				boxShadow: "0 10px 30px -18px rgba(0,0,0,0.2)",
			}}
		>
			<Box
				sx={{
					width: 124,
					height: 124,
					borderRadius: "50%",
					bgcolor: "white",
					display: "grid",
					placeItems: "center",
					boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
				}}
			>
				<Stack spacing={0.3} alignItems="center">
					<Typography variant="body2" color="text.secondary" fontWeight={700}>
						Total
					</Typography>
					<Typography variant="h5" fontWeight={800} color="#0F172A">
						188,245
					</Typography>
				</Stack>
			</Box>
		</Box>
	</Box>
);

const Bars = () => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return (
		<Stack spacing={1.5} sx={{ mt: 2 }}>
			<Stack direction="row" spacing={1} alignItems="center">
				{barSeries.map((s) => (
					<Legend key={s.label} label={s.label} color={s.color} />
				))}
				<Box sx={{ flexGrow: 1 }} />
				<Button
					size="small"
					variant="outlined"
					endIcon={<ChevronDownIcon />}
					sx={{ textTransform: "none", borderRadius: 1.5, borderColor: "rgba(0,0,0,0.08)" }}
				>
					2023
				</Button>
			</Stack>
			<Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between">
				{months.map((m, idx) => {
					const total = barSeries.reduce((sum, s) => sum + s.values[idx], 0);
					const maxTotal = 60;
					const height = (total / maxTotal) * 140 + 16;
					return (
						<Stack key={m} spacing={0.5} alignItems="center">
							<Box
								sx={{
									width: 16,
									height,
									borderRadius: 10,
									overflow: "hidden",
									display: "flex",
									flexDirection: "column-reverse",
									boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
								}}
							>
								{barSeries.map((s) => (
									<Box
										key={s.label}
										sx={{
											height: `${(s.values[idx] / total) * 100}%`,
											bgcolor: s.color,
										}}
									/>
								))}
							</Box>
							<Typography variant="caption" color="text.secondary">
								{m}
							</Typography>
						</Stack>
					);
				})}
			</Stack>
		</Stack>
	);
};

const ChevronDownIcon = () => (
	<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M6 9l6 6 6-6" />
	</svg>
);

const StatusChip = ({ label, tone }: { label: string; tone: "success" | "error" | "warning" }) => {
	const palette = {
		success: { bg: "#ECFDF3", text: "#16A34A" },
		error: { bg: "#FEF2F2", text: "#DC2626" },
		warning: { bg: "#FFFAEB", text: "#CA8A04" },
	}[tone];
	return (
		<Chip
			label={label}
			size="small"
			sx={{ bgcolor: palette.bg, color: palette.text, fontWeight: 700, borderRadius: 1.5 }}
		/>
	);
};

export default function DashboardPage() {
	const [slide, setSlide] = useState(0);
	const nextSlide = () => setSlide((s) => (s + 1) % featuredSlides.length);
	const prevSlide = () => setSlide((s) => (s - 1 + featuredSlides.length) % featuredSlides.length);

	useEffect(() => {
		const id = window.setInterval(() => {
			setSlide((s) => (s + 1) % featuredSlides.length);
		}, 6000);
		return () => window.clearInterval(id);
	}, []);

	return (
		<Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "#EDF2F7", minHeight: "100%" }}>
			<Box
				sx={{
					display: "grid",
					gap: { xs: 2, md: 2.5 },
					gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
					alignItems: "stretch",
				}}
			>
				<Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
					<Card
						sx={{
							height: "100%",
							borderRadius: 3,
							overflow: "hidden",
							position: "relative",
							background: "linear-gradient(135deg, #0F172A 0%, #111827 45%, #0EA5E9 100%)",
							color: "white",
							boxShadow: "0 20px 60px -24px rgba(15, 23, 42, 0.6)",
						}}
					>
						<CardContent sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between" }}>
							<Stack spacing={2} maxWidth={380}>
								<Typography variant="body2" sx={{ color: "#A5B4FC" }}>
									Welcome back
								</Typography>
								<Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.1 }}>
									Jaydon Frankie
								</Typography>
								<Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)" }}>
									Track your ConcreteHub supplier performance, orders, and fulfillment health.
								</Typography>
								<Button
									variant="contained"
									sx={{
										alignSelf: "flex-start",
										bgcolor: "#22C55E",
										px: 2.5,
										py: 1,
										textTransform: "none",
										fontWeight: 700,
										borderRadius: 2,
										boxShadow: "0 12px 24px -6px rgba(34,197,94,0.5)",
										":hover": { bgcolor: "#16A34A" },
									}}
								>
									View reports
								</Button>
							</Stack>

							<Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "flex-end" }}>
								<Box
									sx={{
										width: 220,
										height: 220,
										position: "relative",
										display: "grid",
										placeItems: "center",
									}}
								>
									<Box
										sx={{
											position: "absolute",
											inset: 0,
											background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent)",
										}}
									/>
									<Box
										sx={{
											position: "relative",
											width: 200,
											height: 200,
											borderRadius: "24px",
											background: "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
											border: "1px solid rgba(255,255,255,0.08)",
											boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
										}}
									>
										<Box
											sx={{
												position: "absolute",
												inset: 12,
												borderRadius: 3,
												bgcolor: "rgba(0,0,0,0.25)",
												border: "1px solid rgba(255,255,255,0.08)",
											}}
										/>
										<Avatar
											src="https://images.generated.photos/FLwRvDDDeZPA7eGRIDLaHruM3aMc2SGIN1qfN3npa9A/rs:fit:512:512/czM6Ly9pY29ucy5wcm9kdWN0aW9uL2FwaS9hdmF0YXIvd2F0ZXJtYXJrLzE5Ny5wbmc.png"
											alt="Jaydon"
											sx={{
												width: 120,
												height: 120,
												position: "absolute",
												bottom: -6,
												right: -18,
												boxShadow: "0 14px 30px -12px rgba(0,0,0,0.6)",
												border: "4px solid rgba(255,255,255,0.3)",
										}}
										/>
									</Box>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Box>

				<Box>
					<Card
						sx={{
							height: "100%",
							borderRadius: 3,
							overflow: "hidden",
							position: "relative",
							color: "white",
							boxShadow: "0 18px 50px -24px rgba(14,165,233,0.7)",
						}}
					>
						<Box
							sx={{
								height: 320,
								position: "relative",
								borderRadius: 3,
								overflow: "hidden",
								background: `linear-gradient(135deg, rgba(14,165,233,0.9), rgba(30,58,138,0.92)), url(${featuredSlides[slide].image}) center/cover`,
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								p: 2.5,
								transition: "background-image 0.5s ease, background 0.5s ease",
							}}
						>
							<Stack spacing={1.5} sx={{ maxWidth: 320 }}>
								<Chip
									label={featuredSlides[slide].tag}
									sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "white", fontWeight: 700, width: "max-content" }}
								/>
								<Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.15 }}>
									{featuredSlides[slide].title}
								</Typography>
								<Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
									{featuredSlides[slide].description}
								</Typography>
							</Stack>

							<Stack direction="row" spacing={1.5} alignItems="center">
								<IconButton
									onClick={prevSlide}
									sx={{
										color: "white",
										bgcolor: "rgba(255,255,255,0.16)",
										"&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
									}}
								>
									<ChevronLeftRounded />
								</IconButton>
								<IconButton
									onClick={nextSlide}
									sx={{
										color: "white",
										bgcolor: "rgba(255,255,255,0.16)",
										"&:hover": { bgcolor: "rgba(255,255,255,0.26)" },
									}}
								>
									<ChevronRightRounded />
								</IconButton>
								<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", gap: 0.75 }}>
									{featuredSlides.map((_, idx) => (
										<Box
											key={idx}
											sx={{
												width: idx === slide ? 16 : 8,
												height: 8,
												borderRadius: 999,
												bgcolor: "rgba(255,255,255,0.65)",
												opacity: idx === slide ? 1 : 0.5,
												transition: "all 0.25s ease",
											}}
											aria-label={`Go to slide ${idx + 1}`}
											role="button"
											onClick={() => setSlide(idx)}
										/>
									))}
								</Box>
								<IconButton
									sx={{
										color: "white",
										bgcolor: "rgba(255,255,255,0.2)",
										"&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
									}}
								>
									<ArrowForwardRounded />
								</IconButton>
							</Stack>
						</Box>
					</Card>
				</Box>

				{metricCards.map((card) => (
					<Box key={card.title}>
						<Card
							sx={{
								borderRadius: 3,
								boxShadow: "0 16px 32px -24px rgba(0,0,0,0.28)",
								bgcolor: "white",
								border: "1px solid #EEF1F4",
							}}
						>
							<CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
								<Stack direction="row" alignItems="center" spacing={1.5}>
									<Typography variant="subtitle1" fontWeight={700}>
										{card.title}
									</Typography>
									<Box sx={{ flexGrow: 1 }} />
									<MiniBars values={card.bars} color={card.barColor} />
								</Stack>
								<Typography variant="h3" fontWeight={800} color="#0F172A" sx={{ lineHeight: 1 }}>
									{card.value}
								</Typography>
								<Stack direction="row" alignItems="center" spacing={1}>
									<TrendIcon direction={card.trend} color={card.trend === "up" ? "#0EA960" : "#EF4444"} />
									<Typography variant="body1" sx={{ color: card.trend === "up" ? "#0EA960" : "#EF4444", fontWeight: 700 }}>
										{card.change}
									</Typography>
									<Typography variant="body1" color="text.secondary">
										last 7 days
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Box>
				))}

				<Box>
					<Card sx={{ borderRadius: 3, boxShadow: "0 14px 36px -18px rgba(0,0,0,0.25)" }}>
						<CardContent>
							<Stack spacing={2}>
								<Stack direction="row" alignItems="center" spacing={1}>
									<Typography variant="subtitle1" fontWeight={700}>
										Current download
									</Typography>
									<Box sx={{ flexGrow: 1 }} />
									<IconButton size="small">
										<MoreHorizRounded fontSize="small" />
									</IconButton>
								</Stack>
								<Typography variant="body2" color="text.secondary">
									Downloaded by operating system
								</Typography>
								<Box sx={{ display: "grid", placeItems: "center", py: 2 }}>
									<DonutChart />
								</Box>
								<Stack direction="row" spacing={2.5} alignItems="center" justifyContent="center">
									{[
										{ label: "Mac", color: donutColors[0] },
										{ label: "Window", color: donutColors[1] },
										{ label: "iOS", color: donutColors[2] },
										{ label: "Android", color: donutColors[3] },
									].map((item) => (
										<Legend key={item.label} label={item.label} color={item.color} />
									))}
								</Stack>
							</Stack>
						</CardContent>
					</Card>
				</Box>

				<Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
					<Card sx={{ borderRadius: 3, boxShadow: "0 14px 36px -18px rgba(0,0,0,0.25)" }}>
						<CardContent>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Typography variant="subtitle1" fontWeight={700}>
									Area installed
								</Typography>
								<Box sx={{ flexGrow: 1 }} />
								<Button
									size="small"
									variant="outlined"
									endIcon={<ChevronDownIcon />}
									sx={{ textTransform: "none", borderRadius: 1.5, borderColor: "rgba(0,0,0,0.08)" }}
								>
									2023
								</Button>
							</Stack>
							<Bars />
						</CardContent>
					</Card>
				</Box>

				<Box sx={{ gridColumn: { xs: "span 1", lg: "span 2" } }}>
					<Card sx={{ borderRadius: 3, boxShadow: "0 12px 32px -18px rgba(0,0,0,0.24)" }}>
						<CardContent>
							<Stack direction="row" alignItems="center" spacing={1}>
								<Typography variant="subtitle1" fontWeight={700}>
									New Invoices
								</Typography>
								<Box sx={{ flexGrow: 1 }} />
								<Button size="small" sx={{ textTransform: "none", color: "#2563EB", fontWeight: 700 }}>
									View all
								</Button>
							</Stack>
							<Table sx={{ mt: 1.5 }}>
								<TableHead>
									<TableRow>
										<TableCell>Invoice ID</TableCell>
										<TableCell>Category</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Status</TableCell>
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{invoices.map((inv) => (
										<TableRow key={inv.id} hover>
											<TableCell sx={{ fontWeight: 700 }}>{inv.id}</TableCell>
											<TableCell>{inv.category}</TableCell>
											<TableCell>{inv.price}</TableCell>
											<TableCell>
												<StatusChip label={inv.status} tone={inv.tone} />
											</TableCell>
											<TableCell align="right">
												<IconButton size="small">
													<MoreHorizRounded fontSize="small" />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</Box>

				<Box>
					<Card sx={{ borderRadius: 3, boxShadow: "0 12px 32px -18px rgba(0,0,0,0.24)" }}>
						<CardContent>
							<Typography variant="subtitle1" fontWeight={700}>
								Top customers
							</Typography>
							<Stack spacing={2} sx={{ mt: 2 }}>
								{customers.map((customer) => (
									<Stack key={customer.name} direction="row" alignItems="center" spacing={1.5}>
										<Avatar sx={{ bgcolor: customer.color }}>
											{customer.name[0]}
										</Avatar>
										<Box>
											<Typography fontWeight={700}>{customer.name}</Typography>
										</Box>
										<Box sx={{ flexGrow: 1 }} />
										{customer.icon}
									</Stack>
								))}
							</Stack>
						</CardContent>
					</Card>
				</Box>
			</Box>
		</Box>
	);
}
