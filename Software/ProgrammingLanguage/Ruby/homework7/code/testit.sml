#lang racket
(define one
  (lambda ()
    (letrec ([f (lambda (x) 
                  (cons x (lambda () (f (+ x 1)))))])
           (f 1) )))
(define (twice-each s)
  (lambda ()
    (let ([pr (s)])
      (cons (car pr)
            (lambda ()
              (cons (car pr)
                    (twice-each (cdr pr))))))))