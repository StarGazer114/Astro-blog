---
title: 使用cloudflare r2搭建免费图床
published: 2025-08-16
description: ''
image: ''
tags: [对象存储, cloudflare, 图床]
category: ''
draft: false 
lang: ''
---
# R2

Cloudflare R2 是 Cloudflare 提供的对象存储服务，每月为免费用户提供 10GB 存储空间，**而且免流量费用**，对于个人图床来说已经非常充足。

下面是相关资费表格：

| 类别    | 内容     | 免费额度                   | 超出部分费用                         |
| ----- | ------ | ---------------------- | ------------------------------ |
| 存储    | 存储空间   | 10GB/月，约可存 5 万张 2MB 图片 | 每增加 1GB 收费 $0.015 美元（约 $15/TB） |
| A 类操作 | 上传、列出  | 100 万次/月，约每天 3.3 万次    | 每增加 100 万次 收费 $4.50 美元         |
| B 类操作 | 下载、读取  | 1000 万次/月，约每天 33 万次    | 每增加 1000 万次 收费 $0.36 美元        |
| 出口流量  | 访问数据流量 | 全免                     | 无任何费用                          |

## 使用 R2 搭建图床

### 创建存储桶

首先登录你的 [Cloudflare](https://dash.cloudflare.com/) 账户，点击右侧的 **R2 对象存储**。

需要准备一张银行卡，放心，只要不超出免费额度是不会扣费的。

进入后你会看到如下页面：

![](https://a723572.webp.li/2025/08/11/20250811163609971.png)

点击“创建存储桶”，全部默认即可。

**注意：不要选择“不频繁访问”！该选项没有免费额度！**

![](https://a723572.webp.li/2025/08/11/20250811163816807.png)

创建好存储桶后，还需要设置公开访问，这样他人才能通过链接访问图片。进入桶设置，在自定义域中添加你的图床域名。如果没有域名或不想添加，也可以直接使用公共开发 URL，这是 Cloudflare 提供的一个默认域名，同样可以满足访问需求。

### 使用 API 访问

进入 R2 对象存储 - API - 管理 API 令牌 - 创建 User API 令牌。

选择对象读和写权限，并指定为刚才创建的存储桶。

![](https://a723572.webp.li/2025/08/11/20250811164915303.png)

创建后请妥善保存相关信息，页面关闭后将无法再次查看。

![](https://a723572.webp.li/2025/08/11/20250811165514789.png)

之后可以使用兼容 **S3 API** 的图床程序（如 [PicGo](https://github.com/Molunerfinn/PicGo)）进行上传。

### 对图像进行 WebP 格式转换

> WebP 为网络图片提供了无损和有损压缩能力，同时在有损条件下支持透明通道。官方数据显示：无损 WebP 相比 PNG 可减少 26% 大小；有损 WebP 在相同 [SSIM](https://zhida.zhihu.com/search?content_id=49117332&content_type=Answer&match_order=1&q=SSIM&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3NTUwNzU2MTgsInEiOiJTU0lNIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6NDkxMTczMzIsImNvbnRlbnRfdHlwZSI6IkFuc3dlciIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.7Kr835xcANhF7Y13EhRcMiRJI01ZMa3nmbaZO-rdndE&zhida_source=entity)（结构相似性）下相比 JPEG 可减少 25%~34% 大小；有损 WebP 也支持透明通道，体积通常约为对应 PNG 的 1/3。

简而言之，WebP 能在保证画质的前提下大幅减小图片体积，从而提升加载速度。

[WebP Cloud](https://dashboard.webp.se/) 可以实现这一点。它能将存储在 R2 的图片自动转换为 WebP 格式，每日有 3000 张的免费处理额度，超出后会 301 重定向到原图地址，无需担心用量问题。

本质上，这是一个类 CDN 的图片代理 SaaS 服务，不仅能大幅缩小图片体积，还支持缓存、水印、滤镜等实用功能，并可自定义 Header 配置。

![](C:\Users\Administrator\AppData\Roaming\marktext\images\2025-08-11-17-11-23-image.png)

#### 使用 WebP Cloud 服务

首先注册 [WebP Cloud](https://dashboard.webp.se/)，创建代理。为优化国内访问，地区建议选择 Hillsboro, OR，名称可自定义，代理地址填写你的 R2 图床访问地址。

![](https://a723572.webp.li/2025/08/11/20250811171054898.png)

这样你就获得了一个代理地址。将你的图床地址替换为代理地址即可。

举例：假设一张图片在 R2 的地址为 <u>https://r2.xxxx.com/25/08/11/pic.jpg</u>，你的代理地址为 <u>https://abcd.webp.li</u>，那么替换后的访问地址就是 <u>https://abcd.webp.li/25/08/11/pic.jpg</u>，非常简单。

完
