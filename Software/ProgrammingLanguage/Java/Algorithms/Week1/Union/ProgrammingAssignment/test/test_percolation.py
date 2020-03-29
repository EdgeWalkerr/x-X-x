from copy import deepcopy as copy
import __init__
from percolation import percolation


n = 10
square = [n * n] * (n * n)


def test_isOpen():
    assert not percolation.isOpen(square=copy(square), row=1, col=1)


def test_isFull():
    square = [-1, -1, 2, -1]
    assert percolation.isFull(square=copy(square), row=2, col=2)
    # assert percolation.isFull(square=copy(square), row=2, col=1)


def test_numberOfOpenSites():
    square = [-1, -1, 2, -1]
    assert percolation.numberOfOpenSites(square=copy(square)) == 4

# def test_
