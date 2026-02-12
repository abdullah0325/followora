const isDev = process.env.NODE_ENV === 'development';

function safeStringify(obj, depth = 2) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    try {
      return require('util').inspect(obj, { depth });
    } catch (err) {
      return String(obj);
    }
  }
}

export function logRequest(route, method, info = {}) {
  if (!isDev) return;
  const { url, query, params, headers, body } = info;
  console.log(`[API][REQ] ${method} ${route}`);
  if (url) console.log('  url:', url);
  if (query && Object.keys(query).length) console.log('  query:', safeStringify(query));
  if (params && Object.keys(params).length) console.log('  params:', safeStringify(params));
  if (headers) console.log('  headers:', safeStringify(headers));
  if (body) console.log('  body:', safeStringify(body));
}

export function logResponse(route, method, info = {}) {
  if (!isDev) return;
  const { status, result, error } = info;
  console.log(`[API][RES] ${method} ${route}`);
  if (typeof status !== 'undefined') console.log('  status:', status);
  if (result) console.log('  result:', safeStringify(result));
  if (error) console.log('  error:', safeStringify(error));
}

export default {
  logRequest,
  logResponse,
};
