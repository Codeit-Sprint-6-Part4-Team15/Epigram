import { PropsWithChildren } from "react";

export default function InputError({children}: PropsWithChildren) {
    return (
        <p className="lg:typo-lg-regular typo-sm-medium text-state-error">{children}</p>
    )
}