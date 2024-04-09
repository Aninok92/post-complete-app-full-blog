import { getServerSession } from "next-auth/next";

import { authOptions } from "./api/auth/[...nextauth]";
import UserProfile from "../components/profile/user-profile";
import { GetServerSidePropsContext } from "next";

function ProfilePage(): JSX.Element {
  return <UserProfile />;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
