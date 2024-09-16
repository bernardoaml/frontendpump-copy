type Req = import('next/server').NextRequest;
type Res = import('next/server').NextResponse;

interface Pagination {
  all?: boolean;
  page?: number;
  limit: number | null;
  offset: number | null;
  prev?: number | boolean;
  next?: number | boolean;
  total?: number;
}

type ErrorCode = number | null;
// type ErrorMsg = string | null | undefined;
type ErrorMsg = string | null;
type ErrorName = string | null;
type AlertMsg = string | null | undefined;

type ErrorObj = {
  status: ErrorCode;
  errorMsg: ErrorMsg;
  errorName?: ErrorName;
  alertMsg?: AlertMsg;
};

interface ApiReturnError extends ErrorObj, Error {}

type ResData = Record<string, unknown> | Array<unknown> | null;

interface ResError {
  status?: ErrorCode | null;
  errorMsg: ErrorMsg;
  errorName?: ErrorName;
  errorData?: Record<string, unknown>;
  alertMsg?: AlertMsg;
}

interface ApiReturnList {
  total: number;
  limit: number;
  page: number;
  pages: number;
  orderBy: null;
  sortBy: null;
}

// interface DataChanges extends Record<string, unknown> {
interface DataChanges {
  createdAt?: number | Date;
  createdBy?: number;
  updatedAt?: number | Date;
  updatedBy?: number | null;
}

interface DefaultApiReturn {
  filter?: string | null;
  limit?: number;
  page?: number;
  pages?: number;
  total?: number;
  params?: Record<string, unknown>;
}

interface ApiFile extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

interface ReactQueryProps {
  queryKey?: import('@tanstack/react-query').QueryKey;
  meta?: Record<string, unknown>;
  signal?: AbortSignal | undefined;
  pageParam?: {
    p?: number | null;
    l?: number | null;
    o?: string | null;
    s?: string | null;
  };
}

interface Cookie {
  name: string;
  value: string;
  maxAge?: number;
  expires?: number | Date;
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
}
