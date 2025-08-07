"use client"

import { useState } from "react"
import { Search, Grid3X3, List, Upload, Plus, Settings, Trash2, Download, Share, MoreVertical, Folder, FileText, Image, Video, Music, Archive } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"

// Mock data structure
const mockData = {
  "root": {
    id: "root",
    name: "My Drive",
    type: "folder",
    items: [
      {
        id: "1",
        name: "Documents",
        type: "folder",
        modified: "Dec 15, 2024",
        size: "—",
        items: [
          {
            id: "1-1",
            name: "Resume.pdf",
            type: "pdf",
            modified: "Dec 10, 2024",
            size: "2.1 MB",
            url: "#"
          },
          {
            id: "1-2",
            name: "Project Proposal.docx",
            type: "document",
            modified: "Dec 8, 2024",
            size: "1.5 MB",
            url: "#"
          }
        ]
      },
      {
        id: "2",
        name: "Photos",
        type: "folder",
        modified: "Dec 12, 2024",
        size: "—",
        items: [
          {
            id: "2-1",
            name: "vacation-2024.jpg",
            type: "image",
            modified: "Dec 1, 2024",
            size: "4.2 MB",
            url: "#"
          },
          {
            id: "2-2",
            name: "profile-pic.png",
            type: "image",
            modified: "Nov 28, 2024",
            size: "1.8 MB",
            url: "#"
          }
        ]
      },
      {
        id: "3",
        name: "Videos",
        type: "folder",
        modified: "Dec 5, 2024",
        size: "—",
        items: [
          {
            id: "3-1",
            name: "presentation.mp4",
            type: "video",
            modified: "Dec 3, 2024",
            size: "125 MB",
            url: "#"
          }
        ]
      },
      {
        id: "4",
        name: "Spreadsheet Analysis.xlsx",
        type: "spreadsheet",
        modified: "Dec 14, 2024",
        size: "892 KB",
        url: "#"
      },
      {
        id: "5",
        name: "Meeting Notes.txt",
        type: "text",
        modified: "Dec 13, 2024",
        size: "12 KB",
        url: "#"
      },
      {
        id: "6",
        name: "Archive.zip",
        type: "archive",
        modified: "Dec 11, 2024",
        size: "15.2 MB",
        url: "#"
      }
    ]
  }
}

function getFileIcon(type: string) {
  switch (type) {
    case "folder":
      return <Folder className="w-5 h-5 text-blue-500" />
    case "pdf":
    case "document":
    case "text":
      return <FileText className="w-5 h-5 text-red-500" />
    case "image":
      return <Image className="w-5 h-5 text-green-500" />
    case "video":
      return <Video className="w-5 h-5 text-purple-500" />
    case "music":
      return <Music className="w-5 h-5 text-orange-500" />
    case "archive":
      return <Archive className="w-5 h-5 text-yellow-600" />
    default:
      return <FileText className="w-5 h-5 text-gray-500" />
  }
}

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState(["root"])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")

  const getCurrentFolder = () => {
    let current = mockData.root
    for (let i = 1; i < currentPath.length; i++) {
      const pathId = currentPath[i]
      current = current.items?.find(item => item.id === pathId) as any
    }
    return current
  }

  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentPath([...currentPath, folderId])
  }

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  const navigateToPath = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  const currentFolder = getCurrentFolder()
  const filteredItems = currentFolder.items?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const breadcrumbs = currentPath.map((pathId, index) => {
    if (index === 0) return { id: pathId, name: "My Drive" }
    let current = mockData.root
    for (let i = 1; i <= index; i++) {
      current = current.items?.find(item => item.id === currentPath[i]) as any
    }
    return { id: pathId, name: current.name }
  })

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-lg">Drive</span>
        </div>

        <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New
        </Button>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Folder className="w-4 h-4 mr-3" />
            My Drive
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Share className="w-4 h-4 mr-3" />
            Shared with me
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash2 className="w-4 h-4 mr-3" />
            Trash
          </Button>
        </nav>

        <Separator className="my-4" />

        <div className="text-sm text-gray-600">
          <div className="mb-2">Storage</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <div className="text-xs">6.8 GB of 15 GB used</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4 flex items-center gap-4">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search in Drive"
                className="pl-10 bg-gray-100 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">/</span>}
                <button
                  onClick={() => navigateToPath(index)}
                  className="text-blue-600 hover:underline"
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New folder
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 p-4">
          {viewMode === "list" ? (
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 p-2 text-sm font-medium text-gray-600 border-b">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Modified</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-1"></div>
              </div>
              
              {/* Items */}
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => {
                    if (item.type === "folder") {
                      navigateToFolder(item.id, item.name)
                    } else if (item.url) {
                      window.open(item.url, "_blank")
                    }
                  }}
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {getFileIcon(item.type)}
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="col-span-3 text-sm text-gray-600">
                    {item.modified}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {item.size}
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 w-6 h-6"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                  onClick={() => {
                    if (item.type === "folder") {
                      navigateToFolder(item.id, item.name)
                    } else if (item.url) {
                      window.open(item.url, "_blank")
                    }
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2 scale-150">
                      {getFileIcon(item.type)}
                    </div>
                    <div className="text-sm font-medium truncate w-full mb-1">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>This folder is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
