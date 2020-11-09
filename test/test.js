function quickSort(A, p, r) {
  if (p < r) {
    let q = Partition(A, p, r);
    quickSort(A, p, q - 1);
    quickSort(A, q + 1, r);
  }
}

function Partition(A, p, r) {
  let x = A[r];
  let i = p - 1; // i 之前的包含i都比x小
  for (let j = p; j < r; ++j) {
    if (A[j] <= x) {
      i++;
      [A[j], A[i]] = [A[i], A[j]];
    }
  }
  [A[i + 1], A[r]] = [A[r], A[i + 1]];
  return i + 1;
}
