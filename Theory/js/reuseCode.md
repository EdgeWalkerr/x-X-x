# 代码复用

1. 使用git submodule
2. 层次性的export 其他调用者只能使用最上层的export, 无法使用内部export
3. 避免层次性依赖

    - 避免产生循环依赖

    - 结构更加清晰

需要一个代码库