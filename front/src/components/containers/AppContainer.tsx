import type { ReactNode } from "react";
import { useAppSelector } from "../../redux/ReduxHooks";

const AppContainer = ({ children }: { children: ReactNode }) => {
    const { theme } = useAppSelector((state) => state.UiManagerReducer);
    return <main className={theme}>{children}</main>;
};

export default AppContainer;
