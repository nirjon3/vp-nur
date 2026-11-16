import type { ServerFunctionClient } from "payload";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import config from "@/payload.config";
import "@payloadcms/next/css";
import { importMap } from "./admin/importMap";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export const metadata = {
  title: "Nur CMS — নুরুল হক নুর ওয়েবসাইট",
  description: "Content administration for the Nurul Haque Nur website",
};

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
