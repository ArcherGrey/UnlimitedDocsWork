var factorial = memoizer([1, 1], (recur, n) => {
  return recur(n - 1) * n;
});
