import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface IBreadcumbsContext {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>;
}

interface IBreadcrumbsProviderProps {
  children: ReactNode;
}

const BreadcrumbsProvider = (props: IBreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  const value = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
    }),
    [breadcrumbs],
  );

  return <BreadcumbsContext.Provider value={value} {...props} />;
};

const useBreadcrumbs = () => {
  const context = useContext(BreadcumbsContext);

  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }

  return context;
};

const BreadcumbsContext = createContext<IBreadcumbsContext | undefined>(
  undefined,
);

export { BreadcrumbsProvider, useBreadcrumbs };
