import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useReflections } from '@/hooks/useReflections';
import { getVerseById, type Verse } from '@/data/verses';
import { ArrowLeft, BookOpen, Trash2, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Reflections = () => {
  const { reflections, getReflection, saveReflection, deleteReflection } = useReflections();
  const [selectedVerseId, setSelectedVerseId] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const selectedReflection = selectedVerseId ? getReflection(selectedVerseId) : null;
  const selectedVerse = selectedVerseId ? getVerseById(selectedVerseId) : null;

  const handleSave = () => {
    if (selectedVerseId && editingNote.trim()) {
      saveReflection(selectedVerseId, editingNote.trim());
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    if (selectedReflection) {
      setEditingNote(selectedReflection.note);
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (selectedVerseId) {
      deleteReflection(selectedVerseId);
      setSelectedVerseId(null);
    }
  };

  if (selectedVerseId && selectedVerse) {
    return (
      <PageLayout title="My Reflection">
        <div className="py-4 space-y-4">
          <button 
            onClick={() => {
              setSelectedVerseId(null);
              setIsEditing(false);
            }}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </button>

          {/* Verse preview */}
          <div className="card-verse p-4 space-y-2">
            <p className="font-serif text-sm text-foreground leading-relaxed">
              "{selectedVerse.text}"
            </p>
            <p className="text-xs text-primary font-medium">
              {selectedVerse.reference}
            </p>
          </div>

          {/* Reflection content or editor */}
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editingNote}
                onChange={(e) => setEditingNote(e.target.value)}
                placeholder="Write your personal reflection..."
                className="min-h-[200px] resize-none bg-card border-border"
              />
              <div className="flex gap-3">
                <Button 
                  onClick={handleSave}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Reflection
                </Button>
                <Button 
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : selectedReflection ? (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedReflection.note}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: {format(new Date(selectedReflection.updatedAt), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleEdit}
                  variant="outline"
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  onClick={handleDelete}
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea
                value={editingNote}
                onChange={(e) => setEditingNote(e.target.value)}
                placeholder="Write your personal reflection on this verse..."
                className="min-h-[200px] resize-none bg-card border-border"
              />
              <Button 
                onClick={handleSave}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!editingNote.trim()}
              >
                Save Reflection
              </Button>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Reflections">
      <div className="py-4 space-y-4">
        {reflections.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No reflections yet</p>
            <p className="text-sm text-muted-foreground/70">
              Write personal notes for each verse
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reflections.map((reflection) => {
              const verse = getVerseById(reflection.verseId);
              if (!verse) return null;
              
              return (
                <button
                  key={reflection.verseId}
                  onClick={() => {
                    setSelectedVerseId(reflection.verseId);
                    setEditingNote(reflection.note);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl bg-card border border-border/50 shadow-card",
                    "transition-all duration-200 hover:shadow-soft hover:border-border",
                    "active:scale-[0.98]"
                  )}
                >
                  <p className="text-xs text-primary font-medium mb-1">
                    {verse.reference}
                  </p>
                  <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                    {reflection.note}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(new Date(reflection.updatedAt), 'MMM d, yyyy')}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Reflections;
