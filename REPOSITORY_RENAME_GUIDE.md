# Repository Rename Guide / 仓库重命名指南

## Overview / 概述

**English:** This guide explains how to rename the repository from `ethereum-mcp` to `ethereum-dune-mcp` and update all related references.

**中文:** 本指南说明如何将仓库从`ethereum-mcp`重命名为`ethereum-dune-mcp`并更新所有相关引用。

## Why Rename? / 为什么重命名？

**English:** The new name `ethereum-dune-mcp` better reflects the project's core functionality:
- **Ethereum**: Focus on Ethereum blockchain analytics
- **Dune**: Integration with Dune Analytics for data
- **MCP**: Model Context Protocol server implementation

**中文:** 新名称`ethereum-dune-mcp`更好地反映了项目的核心功能：
- **Ethereum**: 专注于以太坊区块链分析
- **Dune**: 与Dune Analytics的数据集成
- **MCP**: 模型上下文协议服务器实现

## Manual Rename Process / 手动重命名流程

### Step 1: Rename on GitHub / 在GitHub上重命名

**English:**
1. Go to https://github.com/clumsynonono/ethereum-mcp
2. Click on "Settings" tab
3. Under "General" section, find "Repository name"
4. Change from `ethereum-mcp` to `ethereum-dune-mcp`
5. Click "Rename"

**中文:**
1. 访问 https://github.com/clumsynonono/ethereum-mcp
2. 点击"Settings"选项卡
3. 在"General"部分找到"Repository name"
4. 从`ethereum-mcp`改为`ethereum-dune-mcp`
5. 点击"Rename"

### Step 2: Update Local Repository / 更新本地仓库

**English:** After renaming on GitHub, update your local repository:

**中文:** 在GitHub上重命名后，更新您的本地仓库：

```bash
# Update remote URL / 更新远程URL
git remote set-url origin https://github.com/clumsynonono/ethereum-dune-mcp.git

# Verify the change / 验证更改
git remote -v
```

### Step 3: Update Documentation References / 更新文档引用

**English:** The following files have been updated to reflect the new name:

**中文:** 以下文件已更新以反映新名称：

✅ **Already Updated / 已更新:**
- `README.md` - Added bilingual title and references
- `README_BILINGUAL_ENHANCED.md` - Uses new name throughout
- `SETUP_GUIDE_BILINGUAL.md` - Updated repository references
- `CONFIGURE_QUERIES_BILINGUAL.md` - Updated references

### Step 4: Update Local Configurations / 更新本地配置

**English:** Update any local scripts or configurations:

**中文:** 更新任何本地脚本或配置：

```bash
# Update git config if needed / 如需要更新git配置
git config remote.origin.url https://github.com/clumsynonono/ethereum-dune-mcp.git

# Update any local scripts / 更新任何本地脚本
# Check for references to old name / 检查对旧名称的引用
grep -r "ethereum-mcp" . --exclude-dir=.git --exclude="*.log"
```

### Step 5: Update Package.json / 更新Package.json

**English:** Update the package name if needed:

**中文:** 如需要更新包名称：

```json
{
  "name": "ethereum-dune-mcp",
  "description": "Ethereum Dune MCP Server - Bilingual MCP server for Ethereum analytics powered by Dune Analytics",
  "repository": {
    "type": "git",
    "url": "https://github.com/clumsynonono/ethereum-dune-mcp.git"
  }
}
```

## Branch Strategy / 分支策略

### Current Situation / 当前情况
**English:**
- `main` branch: Contains original code (1 commit)
- `master` branch: Contains integrated bilingual documentation
- Both branches have different commit histories

**中文:**
- `main` 分支：包含原始代码（1个提交）
- `master` 分支：包含集成的双语文档
- 两个分支有不同的提交历史

### Recommended Solution / 推荐解决方案

**English:** Option 1: Merge master into main (requires force push)
```bash
# Checkout main / 检出main
git checkout main

# Merge master / 合并master
git merge master --allow-unrelated-histories

# Push to main / 推送到main
git push origin main

# Update default branch / 更新默认分支
# Go to GitHub Settings → Branches → Set main as default
```

**中文:** 选项1：将master合并到main（需要强制推送）

**English:** Option 2: Force push master as main
```bash
# Push master to main / 将master推送到main
git push origin master:main --force

# Update default branch to main / 将默认分支更新为main
```

**中文:** 选项2：强制推送master作为main

## Post-Rename Checklist / 重命名后检查清单

### Verification Steps / 验证步骤

**English:** After renaming, verify:

**中文:** 重命名后，验证：

- [ ] Repository URL works: https://github.com/clumsynonono/ethereum-dune-mcp
- [ ] Clone works: `git clone https://github.com/clumsynonono/ethereum-dune-mcp.git`
- [ ] Documentation references are updated
- [ ] Package.json is updated
- [ ] All links in documentation work

### Communication / 沟通

**English:** Notify users about the rename:
- Update repository description
- Add a note in README about the name change
- Inform any collaborators or users

**中文:** 通知用户有关重命名的信息：
- 更新仓库描述
- 在README中添加关于名称更改的说明
- 通知任何协作者或用户

## Troubleshooting / 故障排除

### Common Issues / 常见问题

**Issue / 问题:** "Repository not found" after rename
**Solution / 解决方案:** Wait a few minutes for GitHub to propagate changes

**Issue / 问题:** Local git push fails
**Solution / 解决方案:** Update remote URL with `git remote set-url origin NEW_URL`

**Issue / 问题:** Documentation still shows old links
**Solution / 解决方案:** Update all documentation files and clear browser cache

## Summary / 总结

**English:** After completing these steps, your repository will be successfully renamed to `ethereum-dune-mcp` with full bilingual documentation support.

**中文:** 完成这些步骤后，您的仓库将成功重命名为`ethereum-dune-mcp`，并提供完整的双语文档支持。

---

**English:** For additional help, please open an issue on GitHub.

**中文:** 如需额外帮助，请在GitHub上提交问题。

*Last updated / 最后更新: November 2025*