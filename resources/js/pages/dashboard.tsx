import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Play,
  FileText,
  CheckCircle2,
  Clock,
  Trophy,
  Target
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

const getLessonIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return <Play className="h-4 w-4" />;
    case 'reading':
      return <FileText className="h-4 w-4" />;
    case 'quiz':
      return <Target className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getLessonTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'reading':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'quiz':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export default function Dashboard() {
  const { language: { levels, code } } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Learning Path
            </h1>
            <p className="text-muted-foreground">
              Continue your journey and master new skills
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {levels.length} Levels
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">2/5 levels</span>
            </div>
            <Progress value={40} className="h-2" />
          </CardContent>
        </Card>

        {/* Levels Grid */}
        <div className="grid gap-6">
          {levels.map((level, levelIndex) => (
            <Card key={level.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {levelIndex + 1}
                    </div>
                    {level.title}
                  </CardTitle>
                  <Badge variant="outline">
                    {level.topics.length} Topics
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {level.topics.map((topic) => (
                    <Card key={topic.id} className="border border-border/50 hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          {topic.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-2">
                        {topic.lessons.map((lesson) => (
                            <Link
                                href={route('topic', {
                                    language: code,
                                    level: level.slug,
                                    topic: topic.slug,
                                    lesson: lesson.slug,
                                })}
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                            >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex-shrink-0">
                                {getLessonIcon(lesson.lesson_type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                  {lesson.title}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${getLessonTypeColor(lesson.lesson_type)}`}
                              >
                                {lesson.lesson_type}
                              </Badge>
                              <CheckCircle2 className="h-4 w-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
                            </div>
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
