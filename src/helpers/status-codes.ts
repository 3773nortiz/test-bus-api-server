export const commonHeaders = {
  'Access-Control-Allow-Origin': '*',
};

export const success = (data?: string | object | number) => {
  return {
    statusCode: 200,
    headers: { ...commonHeaders },
    body: JSON.stringify(data),
  };
};

export const badRequest = (summary?: string | object) => {
  return {
    statusCode: 400,
    headers: { ...commonHeaders },
    body: JSON.stringify(summary ?? 'Bad Request'),
  };
};

export const unauthorised = (summary?: string | object) => {
  return {
    statusCode: 401,
    headers: { ...commonHeaders },
    body: JSON.stringify(summary ?? 'Unauthorised'),
  };
};

export const notFound = (summary?: string | object) => {
  return {
    statusCode: 404,
    headers: { ...commonHeaders },
    body: JSON.stringify(summary ?? 'Resource Not Found'),
  };
};

export const error = (err: any) => {
  return {
    statusCode: 500,
    headers: { ...commonHeaders },
    body: JSON.stringify({
      errorSummary: err?.message ?? 'Unknown error occurred',
    }),
  };
};

export const forbidden = (summary?: string | object) => {
  return {
    statusCode: 403,
    headers: { ...commonHeaders },
    body: JSON.stringify(summary ?? 'Request has been forbidden'),
  };
};

export const conflict = (summary?: string | object) => {
  return {
    statusCode: 409,
    headers: { ...commonHeaders },
    body: JSON.stringify(
      summary ??
        'There was a conflict between the supplied data and the existing resource.',
    ),
  };
};