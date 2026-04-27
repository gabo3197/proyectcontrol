'use strict';

const paginate = (query) => {
  const defaultSize = parseInt(process.env.DEFAULT_PAGE_SIZE) || 10;
  const maxSize     = parseInt(process.env.MAX_PAGE_SIZE)     || 50;
  const page        = Math.max(1, parseInt(query.page)     || 1);
  const pageSize    = Math.min(maxSize, Math.max(1, parseInt(query.pageSize) || defaultSize));
  return { limit: pageSize, offset: (page - 1) * pageSize, page, pageSize };
};

const formatPage = (result, page, pageSize) => ({
  data: result.rows,
  pagination: {
    total:      result.count,
    page,
    pageSize,
    totalPages: Math.ceil(result.count / pageSize),
  },
});

module.exports = { paginate, formatPage };
