// import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { isClient } from "./utils";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOption } from "./authOption";
//import { authOptions } from './auth-options';
// import { isClient } from "./utils";
// import cookies from "js-cookie";

type Config = Omit<RequestInit, "body"> & {
  body?: FormData | Record<string, unknown>; // --------- change any to unkonwn to avoid an error
  isPage?: boolean;
};

async function http<T>(
  url: string,
  params?: Record<string, unknown>, // --------- change any to unkonwn to avoid an error
  config?: Config
) {
  let endpoint = process.env.NEXT_PUBLIC_BASE_URL + url;

  // if (params) {
  //   endpoint += ?${decodeURIComponent(stringifyParams(params))};
  // }

    // استخدم params لبناء query string
    if (params) {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      endpoint += `?${decodeURIComponent(queryString)}`;
    }

  // const locale = cookies.get("NEXT_LOCALE") || "ar";
  let session;

  if (isClient()) {
    session = await getSession();
  } else {
    session = await getServerSession(authOption);
  }

  const isFormData = config?.body instanceof FormData;
  const response: Response = await fetch(endpoint, {
    // -----add type to response
    ...config,
    body: isFormData ? (config.body as FormData) : JSON.stringify(config?.body),
    headers: {
      "Accept-Language": "ar",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...config?.headers,
      ...(session && { Authorization: `Bearer ${session?.user.data.token}` }), // ----- here error in jwt check
    },
  });

  let content: unknown; // --------- change any to unkonwn to avoid an error
  if (!response.ok) {
    
    const errorResponse = await response;
    const faliure = (await response?.json())
    content = errorResponse?.statusText || (!faliure?.success ? faliure?.message : null) || "حدث خطأ ما!";
    if (errorResponse.status === 404) {
      return notFound();
    }

    // // TODO: check which status to redirect to logout page
    // if ([401, 403].includes(response.status)) {
    //   redirect("/logout");
    // }
  } else {
    content = await response.json();
  }

  return new Promise<T>((resolve, reject) => {
    if (response.ok) return resolve(content as T);
    reject(new Error(content as string));
  });
}

// aliases for http with methods
export function getApi<T>(
  url: string,
  params?: Record<string, unknown>, // --------- change any to unkonwn to avoid an error
  config?: Config
) {
  return http<T>(url, params, { ...config, method: "GET" });
}

export function putApi<T>(
  url: string,
  config?: Config,
  method: string = "PUT"
) {
  return http<T>(url, undefined, { ...config, method: method });
}

export function postApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: "POST" });
}

export function deleteApi<T>(url: string, config?: Config) {
  return http<T>(url, undefined, { ...config, method: "DELETE" });
}
