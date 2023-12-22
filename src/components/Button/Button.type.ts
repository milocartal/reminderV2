export type ConnectButtonComponent = TypeButton | TypeLink;

interface CommonButton {
    type: "button" | "submit" | "reset" | "link" | undefined;
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

export interface ButtonPrimaryComponent extends TypeButton {
    type: "button";
    text: string;
    onPress?: (e: React.SyntheticEvent, ...args: unknown[]) => void;
}