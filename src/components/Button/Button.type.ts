export type ButtonComponent = TypeButton | TypeLink;

interface CommonButton {
    type: "button" | "link";
    style?: string
}

interface TypeButton extends CommonButton {
    signInOptions?: string
    type: "button";
}

interface TypeLink extends CommonButton {
    type: "link";
    href?: string;
}