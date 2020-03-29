#lang racket
(provide (all-defined-out))
(define (count_falses aList)
  (cond [(null? aList) 0]
        [(list? (car aList)) (+ (count_falses (car aList)) (count_falses (cdr aList)))]
        [(car aList) (count_falses (cdr aList))]
        [#t (+ 1 (count_falses (cdr aList)))]))
(define (my-if-strange-but-works e1 e2 e3)
  (if e1 (e2) (e3)))
(define (factorial-okay x)
  (my-if-strange-but-works
   (= x 0)
   (lambda () 1)
   (lambda () (* x (factorial-okay (- x 1))))))
(define (factorial-normal x)
  (if (= x 0)
      1
      (* x (factorial-normal (- x 1)))))
(define a "asdfasd")
(set! a 3)