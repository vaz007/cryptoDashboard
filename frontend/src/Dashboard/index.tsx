import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/session";
import { recipeDetails } from "../config";
import { BlogsIcon, GuideIcon, SignOutIcon } from "../assets/images";
import CryptoGrid from './CryptoGrid.jsx'
import { useNavigate } from "react-router-dom";

export interface Link {
    name: string;
    onClick: () => void;
    icon: string;
}

export default function Dashboard() {
    const sessionContext = useSessionContext();
    const navigate = useNavigate();

    if (sessionContext.loading === true) {
        return null;
    }

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    function openLink(url: string) {
        window.open(url, "_blank");
    }

    const links: Link[] = [
        {
            name: "Blogs",
            onClick: () => openLink("https://supertokens.com/blog"),
            icon: BlogsIcon,
        },
        {
            name: "Documentation",
            onClick: () => openLink(recipeDetails.docsLink),
            icon: GuideIcon,
        },
        {
            name: "Sign Out",
            onClick: logoutClicked,
            icon: SignOutIcon,
        },
    ];

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand mx-3" href="#">Crypto Price Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end me-3" id="navbarSupportedContent">

                        <div role={"button"} onClick={links[2].onClick}>
                            {links[2].name}
                        </div>
                    </div>
                </div>
            </nav>

            <CryptoGrid />

        </>
    );
}
