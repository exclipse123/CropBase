import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Bell, Mail, MessageSquare, Clock, AlertCircle, Database } from 'lucide-react';
import { toast } from 'sonner';

export default function Alerts() {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [overdueEnabled, setOverdueEnabled] = useState(true);
  const [blockedEnabled, setBlockedEnabled] = useState(true);
  const [freshnessEnabled, setFreshnessEnabled] = useState(true);

  const handleSave = () => {
    toast.success('Alert settings saved');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Alerts</h1>
        <p className="text-sm text-neutral-600 mt-1">Configure notifications for critical events</p>
      </div>

      <div className="space-y-6">
        {/* Notification Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Mail className="h-5 w-5 text-neutral-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="email-toggle" className="text-base font-semibold cursor-pointer">
                      Email notifications
                    </Label>
                    <Switch
                      id="email-toggle"
                      checked={emailEnabled}
                      onCheckedChange={setEmailEnabled}
                    />
                  </div>
                  {emailEnabled && (
                    <div className="space-y-2 mt-3">
                      <Label htmlFor="email-input">Email address</Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="your@email.com"
                        defaultValue="manager@aggiedemo.farm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SMS */}
            <div className="flex items-start justify-between pt-6 border-t">
              <div className="flex items-start gap-3 flex-1">
                <MessageSquare className="h-5 w-5 text-neutral-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="sms-toggle" className="text-base font-semibold cursor-pointer">
                      SMS notifications
                    </Label>
                    <Switch
                      id="sms-toggle"
                      checked={smsEnabled}
                      onCheckedChange={setSmsEnabled}
                    />
                  </div>
                  {smsEnabled && (
                    <div className="space-y-2 mt-3">
                      <Label htmlFor="phone-input">Phone number</Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                      <p className="text-xs text-neutral-500">
                        Standard SMS rates may apply
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alert Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overdue Tasks */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="overdue-toggle" className="text-base font-semibold cursor-pointer">
                    Overdue tasks
                  </Label>
                  <Switch
                    id="overdue-toggle"
                    checked={overdueEnabled}
                    onCheckedChange={setOverdueEnabled}
                  />
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Get notified when tasks become overdue
                </p>
                {overdueEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="overdue-threshold">Threshold</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="overdue-threshold" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 or more overdue tasks</SelectItem>
                        <SelectItem value="3">3 or more overdue tasks</SelectItem>
                        <SelectItem value="5">5 or more overdue tasks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            {/* Blocked Tasks */}
            <div className="flex items-start justify-between pt-6 border-t">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="blocked-toggle" className="text-base font-semibold cursor-pointer">
                    Blocked tasks
                  </Label>
                  <Switch
                    id="blocked-toggle"
                    checked={blockedEnabled}
                    onCheckedChange={setBlockedEnabled}
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Alert when tasks are blocked by weather or other conditions
                </p>
              </div>
            </div>

            {/* Data Freshness */}
            <div className="flex items-start justify-between pt-6 border-t">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="freshness-toggle" className="text-base font-semibold cursor-pointer">
                    Data freshness
                  </Label>
                  <Switch
                    id="freshness-toggle"
                    checked={freshnessEnabled}
                    onCheckedChange={setFreshnessEnabled}
                  />
                </div>
                <p className="text-sm text-neutral-600 mb-3">
                  Remind when it's been a while since your last import
                </p>
                {freshnessEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="freshness-threshold">No import in</Label>
                    <Select defaultValue="3">
                      <SelectTrigger id="freshness-threshold" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="2">2 days</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quiet Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Don't send notifications during these hours
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quiet-start">Start time</Label>
                <Input
                  id="quiet-start"
                  type="time"
                  defaultValue="22:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-end">End time</Label>
                <Input
                  id="quiet-end"
                  type="time"
                  defaultValue="07:00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Per-Field Overrides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Per-Field Overrides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Configure custom alert rules for specific fields
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
                <div>
                  <div className="font-medium">Field D - Alfalfa</div>
                  <div className="text-sm text-neutral-600">Alert on any task overdue</div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
                <div>
                  <div className="font-medium">Field E - Orchards</div>
                  <div className="text-sm text-neutral-600">Alert on weather blocks only</div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Add field override
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to defaults</Button>
          <Button onClick={handleSave}>Save settings</Button>
        </div>
      </div>
    </div>
  );
}
