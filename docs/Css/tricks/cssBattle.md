# 精简 css 代码

<!-- cssBattle 使用 -->

1. 移除空格

```css
/* before */
<style>
	div {
		color: red;
	}
</style>

/* after */
<style>div{color:red;}</style>
```

2. 刪除最后一个冒号

```css
/* before */
<style>
	div {
		background: red;
		height: 200px;
	}
</style>

/* after */
<style>
	div {
		background: red;
		height: 200px
	}
</style>
```

3. 不关闭标签（浏览器会帮你关闭）

```css
/* before */
<div > </div > <style > div {
  color: red;
}
</style>

/* after */
<div>
<style>
	div {
  color: red;
}
```

4. 去掉双引号

```css
/* before */
<div style="border:1px solid blue"></div>

/* after */
<div style=border:solid+10px#00f></div>
```

5. 属性赋值代替 （经测试普通环境也可以）

```css
/* before */
<p><p><p><p><p>
<style>
	p:nth-child(3){
		background: red;
	}
</style>

/* after */
<p><p><p i><p><p>
<style>
	p[i]{
		background: red;
	}
</style>
```

6. 大部分时候 `position:fixed` 可以替换 `position:absolute`
7. 使用更简单的单位

```css
/* before */
<style>
	div{
		width: 100px;
	}
</style>

/* after */
<style>
	div{
		width: 25vw;
	}
</style>
```

8. 大部分属性可以省略 `px` （测试不支持）

```css
/* before */
<div>
<style>
	div {
		width: 100px;
		margin: 8px;
	}
</style>

/* after */
<div>
<style>
	div {
		width: 100;
		margin: 8;
	}
</style>
```
