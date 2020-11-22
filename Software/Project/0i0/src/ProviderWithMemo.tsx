import React, { ReactComponentElement } from "react";
import { Provider } from ".";
import { MemoComponent } from "./MemoComponent";

export default function ProviderWithMemo({
	deps,
	children,
	value
}: {
	children: ReactComponentElement<any, any>;
	value: any;
	deps: any;
}) {
	return (
		<Provider value={value}>
			<MemoComponent deps={deps}>{children}</MemoComponent>
		</Provider>
	);
}
