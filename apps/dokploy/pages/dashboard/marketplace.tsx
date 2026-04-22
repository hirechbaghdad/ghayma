import { validateRequest } from "@dokploy/server/lib/auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";
import superjson from "superjson";
import { ShowMarketplace } from "@/components/dashboard/marketplace/show-marketplace";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { appRouter } from "@/server/api/root";

const MarketplacePage = () => {
	return <ShowMarketplace />;
};

export default MarketplacePage;

MarketplacePage.getLayout = (page: ReactElement) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(
	ctx: GetServerSidePropsContext<{ serviceId: string }>,
) {
	const { req, res } = ctx;
	const { user, session } = await validateRequest(req);

	if (!user) {
		return {
			redirect: {
				permanent: true,
				destination: "/",
			},
		};
	}

	if (user.role === "member" && !user.canCreateServices) {
		return {
			redirect: {
				permanent: true,
				destination: "/dashboard/projects",
			},
		};
	}

	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {
			req: req as any,
			res: res as any,
			db: null as any,
			session: session as any,
			user: user as any,
		},
		transformer: superjson,
	});

	await Promise.all([
		helpers.settings.isCloud.prefetch(),
		helpers.user.get.prefetch(),
		helpers.project.all.prefetch(),
	]);

	return {
		props: {
			trpcState: helpers.dehydrate(),
		},
	};
}
